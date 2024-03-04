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
reviewRoutes.post('/add-review/:announcementID', access(ROLES.all), addReview)
reviewRoutes.patch('/update-review/:reviewID', access(ROLES.all), updateReview)
reviewRoutes.delete('/delete-review/:reviewID', access(ROLES.all), deleteReview)
reviewRoutes.get('/get-review/:reviewID', access(ROLES.all), getReview)

export default reviewRoutes