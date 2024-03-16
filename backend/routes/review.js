import express from 'express'
import access from '../middlewares/auth.js'
import { 
  getReview, 
  addReview, 
  updateReview, 
  deleteReview,
  getAnnouncementReviews, 
} from '../controllers/review.js'
import ROLES from '../utils/roles.js'

const reviewRoutes = express.Router()

// reviewRoutes.use(access(ROLES.all))

reviewRoutes.get('/get-reviews/:announcementID', access(ROLES.all), getAnnouncementReviews)
reviewRoutes.post('/add/:announcementID', access(ROLES.all), addReview)
reviewRoutes.patch('/update/:reviewID', access(ROLES.all), updateReview)
reviewRoutes.delete('/delete/:reviewID', access(ROLES.all), deleteReview)
reviewRoutes.get('/get/:reviewID', access(ROLES.all), getReview)

export default reviewRoutes