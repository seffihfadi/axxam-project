import Announcement from "../models/Announcement.js"
import Reservation from "../models/Reservation.js"
import moment from 'moment'

import { isValidObjectId } from "mongoose"
import { validateGuests } from "../utils/validation.js"
import { stripe } from "../api/stripe.js"
import { sendNotification } from "../controllers/notifications.js"
import { calculateTotalPrice } from "../utils/func.js"

// done notification 
export const createCheckoutSession = async (req, res, next) => {

  const { _id: clientID } = req.user
  const {announcementID} = req.params
  const {checkin, checkout, guests} = req.body

  const domainUrl = process.env.WEB_APP_URL
  

  try {
    // Inputs Validation
    if (!isValidObjectId(announcementID)) {
      res.status(400)
      throw new Error('enter a valid data !')
    }
    
    const announcement = await Announcement.findById(announcementID)
    .populate({
      path: 'owner',
      select: 'extra',
      populate: {
        path: 'extra',
        select: 'stripeAccountId'
      }
    })
    if (!announcement || !announcement?.isVisible) {
      res.status(400)
      throw new Error('announcement not found !')
    }
    
    const lessorStripeAccountId = announcement.owner.extra.stripeAccountId
    
    const validGuests = validateGuests(guests, announcement.maxPersons)
    if (!validGuests.isValid) {
      res.status(400)
      throw new Error(validGuests.message)
    }
    
    const checkinDate = moment(checkin)
    const checkoutDate = moment(checkout)
    if (!checkinDate.isValid() || !checkoutDate.isValid() || !checkoutDate.isAfter(checkinDate)) {
      res.status(400)
      throw new Error('invalid check-in or check-out dates.')
    }
    
    // Check overlapping reservations
    const overlappingReservations = await Reservation.find({
      announcement: announcementID,
      status: { $in: ['pending', 'accepted'] },
      $or: [
        { checkin: { $lt: checkout }, checkout: { $gt: checkin } },
      ],
    })
    
    if (overlappingReservations.length > 0) {
      res.status(400)
      throw new Error('the announcement is not available for the selected dates.')
    }
    
    
    // Calculata total price
    const days = checkoutDate.diff(checkinDate, 'days')
    const totalPrice = calculateTotalPrice(
      days, 
      {
        price: announcement.price, 
        reductions: announcement.reductions
      }, 
      guests
    )
    
    // Create payment session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            unit_amount: totalPrice,
            currency: "dzd",
            product_data: {
              name: announcement.title,
              description: announcement.desc,
              images: announcement.images[0].secure_url
            }
          }
        }
      ],
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/canceled`,
      metadata: {
        announcementID,
        clientID: clientID.toString(),
        checkin: checkin,
        checkout: checkout,
        guests: JSON.stringify(guests),
      },
      payment_intent_data: {
        application_fee_amount: Math.round(totalPrice * 0.1), 
        transfer_data: {
          destination: lessorStripeAccountId,
        },
      },
    })

    console.log('session', session)
    // send notification 
    await sendNotification(clientID, announcement.owner._id, 'has booked your property.', `/profile/?announcement=${announcementID}`)

    return res.status(200).json({sessionId: session.id})
    // return res.status(200).json({message: 'it works '+ totalPrice + JSON.stringify(guests) + clientID.toString()})
    
  } catch (error) {
    next(error)
  }
}

// done notification
export const cancelReservation = async (req, res, next) => {
  const { _id: clientID } = req.user
  const { reservationID } = req.params
  try {

    if(!isValidObjectId(reservationID)){
      res.status(400)
      throw new Error('invalid data provided !')
    }
    
    const reservation = await Reservation.findById(reservationID).populate({
      path: 'announcement',
      select: 'owner',
      populate: {
        path: 'owner',
        select: 'extra',
        populate: {
          path: 'extra',
          select: 'stripeAccountId'
        }
      }
    })
    if (!reservation) {
      res.status(400)
      throw new Error('reservation not found !')
    }
    
    if (clientID.toString() !== reservation.client.toString()) {
      res.status(403)
      throw new Error('you do not have access to this reservation')
    }
    
    const nowMoment = moment()
    const isCompleted = nowMoment.isAfter(reservation.checkout)
    const CANCEL_FEE_PERCENTAGE = 1 // 0.95 (95%)
    
    // console.log('reservation.status', reservation.status)
    if (!['pending', 'accepted'].includes(reservation.status) || isCompleted) {
      res.status(400)
      throw new Error('reservation cannot be cancelled at its current state')
    }
    
    const paymentIntent = await stripe.paymentIntents.retrieve(reservation.paymentIntentId)
    const totalAmountPaid = paymentIntent.amount
    
    let refundAmount = 0
    
    const checkInDate = moment(reservation.checkin)
    const checkOutDate = moment(reservation.checkout)
    const daysReserved = checkOutDate.diff(checkInDate, 'days')
    
    // pending reservation - full refund
    if (reservation.status === 'pending') {
      refundAmount = totalAmountPaid;
    }
    
    // accepted reservation and current time is before check-in - 95% refund
    if (reservation.status === 'accepted' && nowMoment.isBefore(checkInDate)) {
      refundAmount = totalAmountPaid * CANCEL_FEE_PERCENTAGE
    }
    
    // accepted reservation and current time is after check-in but before check-out
    if (reservation.status === 'accepted' && nowMoment.isAfter(checkInDate)) {
      const daysStayed = nowMoment.diff(checkInDate, 'days')
      const daysNotStayed = daysReserved - daysStayed
      const dailyRate = totalAmountPaid / daysReserved
      refundAmount = daysNotStayed * dailyRate * CANCEL_FEE_PERCENTAGE
    }
    // proceed with the refund logic only if there's an amount to refund
    if (refundAmount > 0) {
      await stripe.refunds.create({
        
        payment_intent: reservation.paymentIntentId,
        amount: refundAmount,
        reverse_transfer: true,  
        refund_application_fee: true
      }
      // , { stripeAccount: reservation.announcement.owner.extra.stripeAccountId }
    )
  }
  
  // update the reservation status
  reservation.status = 'cancelled'
  await reservation.save()
  
  // sending notification
  await sendNotification(clientID, reservation.announcement.owner._id, 'had canceled reservation.', `/profile/?announcement=${reservation.announcement._id}`)
  
  return res.status(200).json({ message: 'reservation cancelled and refund processed successfully.' })
  
} catch (error) {
  next(error)
}
}

const modifyReservationObject = async (reservation) => {
  
  const paymentIntent = await stripe.paymentIntents.retrieve(reservation.paymentIntentId)
  
  const nowMoment = moment()
  const checkInDate = moment(reservation.checkin)
  const checkOutDate = moment(reservation.checkout)
  
  let status = reservation.status
  if (reservation.status === 'accepted') {
    if (nowMoment.isAfter(checkInDate) && nowMoment.isBefore(checkOutDate)) {
      status = 'active'
    } else if (nowMoment.isAfter(checkOutDate)) {
      status = 'completed'
    }
  }
  return {...reservation.toObject(), status, amount: paymentIntent.amount}
  
}

export const getReservation = async (req, res, next) => {
  const { reservationID } = req.params
  try {
    
    if(!isValidObjectId(reservationID)){
      res.status(400)
      throw new Error('invalid data provided !')
    }
    
    const reservation = await Reservation.findById(reservationID)
    if (!reservation) {
      res.status(400)
      throw new Error('reservation not found !')
    }

    const newReservation = await modifyReservationObject(reservation)
    return res.status(200).json(newReservation)

  } catch (error) {
    next(error)
  }
}

export const getLesseeReservations = async (req, res, next) => {
  const {_id: clientID} = req.user
  try {

    const reservations = await Reservation.find({client: clientID})
   
    const transformedReservations = await Promise.all(
      reservations.map(reservation => modifyReservationObject(reservation))
    )

    return res.status(200).json(transformedReservations)
    
  } catch (error) {
    next(error)
  }
}

export const getLessorReservations = async (req, res, next) => {
  const {_id: lessorID} = req.user

  try {
    const reservations = await Reservation.aggregate([
      {
        $lookup: {
          from: 'announcements',
          localField: 'announcement',
          foreignField: '_id', 
          as: 'announcementDetails' 
        }
      },
      {
        $unwind: '$announcementDetails' 
      },
      {
        $match: {
          'announcementDetails.owner': lessorID
        }
      }
    ]);

    return res.status(200).json(reservations)

  } catch (error) {
    next(error)
  }
}

// done notification
export const handleReservation = async (req, res, next) => {
  let { decision } = req.body
  const { _id: lessorID } = req.user
  const { reservationID } = req.params
  try {

    if(!isValidObjectId(reservationID)){
      res.status(400)
      throw new Error('invalid data provided !')
    }

    if (!['accepted', 'rejected'].includes(decision)) {
      decision = 'accepted'
    }

    const reservation = await Reservation.findById(reservationID).populate('announcement')
    if (!reservation) {
      res.status(400)
      throw new Error('reservation not found !')
    }

    if (reservation.announcement.owner.toString() !== lessorID.toString()) {
      res.status(403)
      throw new Error('You do not have access to this reservation')
    }

    if (decision === 'rejected') {
      // refund process
      const paymentIntent = await stripe.paymentIntents.retrieve(reservation.paymentIntentId)
      const totalAmountPaid = paymentIntent.amount

      await stripe.refunds.create({
        payment_intent: reservation.paymentIntentId,
        amount: totalAmountPaid
      })
      var msg = 'has rejected your reservation.'
    }else{
      var msg = 'has accepted your reservation.'
    }
    await sendNotification(lessorID, reservation.client, msg, `/profile/?announcement=${reservation.announcement._id}`)

    reservation.status = decision
    await reservation.save()
  
    return res.status(200).json({message: `the reservation is ${decision}`})

  } catch (error) {
    next(error)
  }
}

export async function getAccountDetails(req, res, next) {
  try {
    // const account = await stripe.balance.retrieve({stripeAccount: 'acct_1P1sSyR3IgYrr4Dg'})
    const account = await stripe.paymentIntents.retrieve('pi_3P55ExJs0TlUZPKJ0I0YH9Zu')
    res.json(account)
  } catch (error) {
    next(error)
  }
}