import cors from 'cors'
import express from "express"
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import errorHandler from './middlewares/error.js'

import userRoutes from "./routes/user.js"
import reviewRoutes from './routes/review.js'
import reservationRoutes from './routes/reservation.js'
import announcementRoutes from './routes/announcement.js'
import notificationRoutes from './routes/notifications.js'

import { createReservationWebhook } from './api/webhook.js'

// init
dotenv.config()
const app = express()
const port = process.env.PORT || 5000

// middlewares
app.use(cors({credentials: true, origin: 'http://localhost:5173'}))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: false}))
app.use(cookieParser())

// socket server


// routes middlewares
app.use('/api/user', userRoutes)
app.use('/api/review', reviewRoutes)
app.use('/api/reservation', reservationRoutes)
app.use('/api/announcement', announcementRoutes)
app.use('/api/notification', notificationRoutes)

// webhooks
app.post('/create-reservation-webhook', express.json({type: 'application/json'}), createReservationWebhook)


// error middlewares
app.use(errorHandler)


// connect to db and start server
try {
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'axxam'
    // dbName:'test'
  })
  app.listen(port, () => {
    console.log('server runing on port ' + port)
  })

} catch (err) {
  console.log('Error of Connection to DB', err)
}