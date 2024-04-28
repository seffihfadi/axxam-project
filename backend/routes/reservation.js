import express from 'express'
import access from '../middlewares/auth.js'
import { 
  cancelReservation, 
  getLesseeReservations, 
  getLessorReservations, 
  getReservation,
  createCheckoutSession,
  handleReservation, 
  getAccountDetails
} from '../controllers/reservation.js'
import ROLES from '../utils/roles.js'

const reservationRoutes = express.Router()

reservationRoutes.post('/create-checkout-session/:announcementID', access(ROLES.lessee), createCheckoutSession)
reservationRoutes.patch('/cancel/:reservationID', access(ROLES.lessee), cancelReservation)
reservationRoutes.patch('/handle/:reservationID', access(ROLES.lessor), handleReservation)
reservationRoutes.get('/get/:reservationID', access(ROLES.all), getReservation)
reservationRoutes.get('/get-lessee', access(ROLES.lessee), getLesseeReservations)
reservationRoutes.get('/get-lessor', access(ROLES.lessor), getLessorReservations)
reservationRoutes.get('/ad', access(ROLES.all), getAccountDetails)

export default reservationRoutes