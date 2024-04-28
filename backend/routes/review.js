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

reviewRoutes.get('/get-reviews/:announcementID', getAnnouncementReviews)
reviewRoutes.post('/add/:announcementID', access(ROLES.lessee), addReview)
reviewRoutes.patch('/update/:reviewID', access(ROLES.lessee), updateReview)
reviewRoutes.delete('/delete/:reviewID', access(ROLES.lessee), deleteReview)
reviewRoutes.get('/get/:reviewID', access(ROLES.lessee), getReview)

export default reviewRoutes