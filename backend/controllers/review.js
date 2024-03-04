import Review from '../models/Review.js'
import Announcement from '../models/Announcement.js'

export const getAnnouncementReviews = async (req, res, next) => {
  const {announcementID} = req.params
  try {
    const reviews = await Review.find({announcement: announcementID})
    return res.status(200).json(reviews)
  } catch (error) {
    next(error)
  }
}


export const addReview = async (req, res, next) => {
  const {announcementID} = req.params
  const {_id: userID} = req.user
  const {comment, rating} = req.body

  try {

    if (Object.values(rating).every(v => v >= 0 && v <= 5)) {
      res.status(400)
      throw new Error('invalid rating: all ratings must be between 1 and 5 stars')
    }


    const announcement = await Announcement.findById(announcementID)
    if (!announcement) {
      res.status(404)
      throw new Error('announcement not found !')
    }

    const oldReview = await Review.findOne({announcement: announcementID, reviewer: userID})
    if (!!oldReview) {
      return res.status(200).json({message: 'you already review this announcement'})
    }

    const ratingMod = {
      cleanliness: rating.cleanliness || undefined,
      communication: rating.communication || undefined,
      location: rating.location || undefined,
      neighbours: rating.neighbours || undefined
    }

    const review = await Review.create({
      announcement: announcementID, 
      reviewer: userID,
      rating: ratingMod,
      comment,
    })

    if (!review) {
      res.status(500)
      throw new Error('review not created, try again later')
    }

    return res.status(201).json({message: 'your review has been successfully stored'})


  } catch (error) {
    next(error)
  }
}


export const updateReview = async (req, res, next) => {
  const {reviewID} = req.params
  const {userID} = req.user
  const {comment, rating} = req.body
  try {

    const review = await Review.findById(reviewID)
    if (!review) {
      res.status(404)
      throw new Error('review does not exist')
    }

    if (review.reviewer.toString() !== userID.toString()) {
      res.status(403)
      throw new Error('this review in not yours !')
    }

    const reviewDoc = {
      comment: comment || review.comment,
      rating: {
        cleanliness: rating?.cleanliness || review.rating.cleanliness,
        communication: rating?.communication || review.rating.communication,
        location: rating?.location || review.rating.location,
        neighbours: rating?.neighbours || review.rating.neighbours
      }
    }

    await Review.findByIdAndUpdate(reviewID, reviewDoc)
    return res.status(200).json({message: 'review has been successfuly updated'})
    
  } catch (error) {
    next(error)
  }
}


export const deleteReview = async (req, res, next) => {
  const {reviewID} = req.params
  const {userID} = req.user


  try {
    const review = await Review.findById(reviewID)
    if (!review) {
      res.status(404)
      throw new Error('this review does not exist')
    }

    if (review.reviewer.toString() !== userID.toString()) {
      res.status(403)
      throw new Error('this review in not yours !')
    }


    await review.deleteOne()
    return res.status(200).json({message: 'review has been deleted'})
    
  } catch (error) {
    next(error)
  }
}


export const getReview = async (req, res, next) => {
  const {reviewID} = req.params
  try {
    const review = await Review.findById(reviewID)
    if (!review) {
      res.status(400)
      throw new Error('review does not exist')
    }

    return res.status(200).json(review)
  } catch (error) {
    next(error)
  }
}