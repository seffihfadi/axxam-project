import express from 'express'
import access from '../middlewares/auth.js'
import { 
  createReservation, 
  cancelReservation, 
  getLesseeReservations, 
  getLessorReservations, 
  getReservation 
} from '../controllers/reservation.js'
import ROLES from '../utils/roles.js'

const reservationRoutes = express.Router()

reservationRoutes.post('/create/:announcementID', access(ROLES.lessor), createReservation)
reservationRoutes.put('/cancel/:reservationID', access(ROLES.all), cancelReservation)
reservationRoutes.get('/get/:reservationID', access(ROLES.all), getReservation)
reservationRoutes.get('/get-lessee/:reserverID', access(ROLES.all), getLesseeReservations)
reservationRoutes.get('/get-lessor/:ownerID', access(ROLES.lessor), getLessorReservations)

export default reservationRoutes