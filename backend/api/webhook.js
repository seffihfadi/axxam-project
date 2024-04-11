import { stripe } from "../utils/stripe.js"
import Reservation from "../models/Reservation.js"


export const webhook = async (req, res, next) => {

  // console.log('skdj')
  // const sig = req.headers['stripe-signature']
  // let event 

  // try {
  //   event = stripe.webhooks.constructEvent(req.body, sig, process.env.WEBHOOK_SECRET)
  // } catch (error) {
  //   // res.status(400).send(`Webhook Error: ${error.message}`);
  //   next(error)
  // }

  // if (event.type === 'checkout.session.completed') {
  //   const session = event.data.object
  //   console.log('session', session)
  // }

  const event = req.body
  // console.log('event.data.object.metadata',event.type, event.data.object.metadata)
  // console.log('event', event.data.object.metadata)
  // console.log('event.type', event.type)
  
  if (event.type === 'checkout.session.completed') {
    const {clientID, announcementID, checkin, checkout, guests} = event.data.object.metadata
    console.log('event', event)

    const reservation = await Reservation.create({
      announcement: announcementID,
      client: clientID,
      checkin: checkin,
      checkout: checkout,
      guests: JSON.parse(guests),
      paymentIntentId: event.data.object.payment_intent
    })
  
    if (!reservation) {
      res.status(500)
      throw new Error('error happend, contact us to refund your amount')
    }
  
    return res.status(201).json({ message: 'Reservation successfully created.' })
  }

}