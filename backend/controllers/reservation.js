import Announcement from "../models/Announcement.js"
import Reservation from "../models/Reservation.js"
import Payment from "../models/Payment.js"

import { isValidObjectId } from "mongoose"
import moment from 'moment'
import { validateGuests } from "../utils/validation.js"
import { stripe } from "../utils/stripe.js"

export const createReservation = async (req, res, next) => {
  const {_id: clientID} = req.user
  const {announcementID} = req.params
  const {checkin, checkout, guests} = req.body

  try {

    if (!isValidObjectId(announcementID)) {
      res.status(400)
      throw new Error('enter a valid data !')
    }

    const announcement = await Announcement.findById(announcementID)

    // console.log('announcement', announcement)
    if (!announcement || !announcement?.isVisible) {
      res.status(400)
      throw new Error('announcement not found !')
    }

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

    const days = checkoutDate.diff(checkinDate, 'days')
    const basePrice = days * announcement.price

    const totalAdultPrice = basePrice * guests.adults * (1 - (announcement.reductions.adults / 100))
    const totalChildrenPrice = basePrice * guests.children * (1 - (announcement.reductions.children / 100))
    const totalInfantsPrice = basePrice * guests.infants * (1 - (announcement.reductions.infants / 100))

    const totalPrice = totalAdultPrice + totalChildrenPrice + totalInfantsPrice;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100), 
      currency: 'dzd', 
      // Add more details as needed, e.g., receipt_email, metadata, etc.
    });
    
    const paymentDetails = {
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
    };

    const payment = await Payment.create(paymentDetails)
    if (!payment) {
      res.status(500)
      throw new Error('error was accured, try later')
    }

    const reservation = await Reservation.create({
        announcement: announcementID,
        client: clientID,
        checkin: checkin,
        checkout: checkout,
        guests,
        paymentDetails: payment._id
    })

    if (!reservation) {
      res.status(500)
      throw new Error('error happend, contact us to refund your amount')
    }

    return res.status(201).json({ message: 'Reservation successfully created.' })



  } catch (error) {
    next(error)
  }
}



export const cancelReservation = async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
}
export const getReservation = async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
}
export const getLesseeReservations = async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
}
export const getLessorReservations = async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
}