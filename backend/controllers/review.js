import Review from '../models/Review.js'
import Announcement from '../models/Announcement.js'
import { sendNotification, unsendNotification} from '../controllers/notifications.js'
import { incrementPoints } from '../utils/pointsSystem.js';

export const getAnnouncementReviews = async (req, res, next) => {
  const { announcementID } = req.params;
  try {
    const reviews = await Review.find({ announcement: announcementID }).populate('reviewer');
    let totalCleanliness = 0;
    let totalCommunication = 0;
    let totalNeighbours = 0;
    let totalLocation = 0;
    let count = reviews.length;

    // Counters for rating levels
    let counts = {
      fiveStars: 0,
      fourStars: 0,
      threeStars: 0,
      twoStars: 0,
      oneStar: 0
    };

    const comments = [];

    for (const review of reviews) {
      const { cleanliness, communication, neighbours, location } = review.rating;
      const comment = review.comment;
      const reviewDate = review.createdAt
      const theReviwer = review.reviewer.fullname
      const theReviwerAvatar = review.reviewer.avatar

      totalCleanliness += cleanliness;
      totalCommunication += communication;
      totalNeighbours += neighbours;
      totalLocation += location;
      
      // Calculate average rating for this review
      let averageRating = (cleanliness + communication + neighbours + location) / 4;
      comments.push({comment, theReviwer, theReviwerAvatar, reviewDate , averageRating, reviewID:review._id})
      
      // Increment counters based on average rating
      if (averageRating === 5) {
        counts.fiveStars++;
      } else if (averageRating >= 4) {
        counts.fourStars++;
      } else if (averageRating >= 3) {
        counts.threeStars++;
      } else if (averageRating >= 2) {
        counts.twoStars++;
      } else {
        counts.oneStar++;
      }
    }
    
    // Calculate averages
    const averageCleanliness = count > 0 ? Math.round(totalCleanliness / count * 10) / 10 : 0;
    const averageCommunication = count > 0 ? Math.round(totalCommunication / count * 10) / 10 : 0;
    const averageNeighbours = count > 0 ? Math.round(totalNeighbours / count * 10) / 10 : 0;
    const averageLocation = count > 0 ? Math.round(totalLocation / count * 10) / 10 : 0;
    const overallAverage = count > 0 ? Math.round(((averageCleanliness + averageCommunication + averageNeighbours + averageLocation) / 4) * 10) / 10 : 0;

    return res.status(200).json({
      rate: {
        counts,
        totalCleanliness: averageCleanliness,
        totalCommunication: averageCommunication,
        totalNeighbours: averageNeighbours,
        totalLocation: averageLocation,
        totalAverage: overallAverage,
        count
      },
      comments
    });
  } catch (error) {
    next(error);
  }
};


// done notification
export const addReview = async (req, res, next) => {
  const {announcementID} = req.params
  const {_id: userID} = req.user
  const {comment, rating} = req.body
console.log({comment, rating});
  try {

    if (!comment) {
      res.status(400)
      throw new Error('you must write a comment')
    }
    
    if (!Object.values(rating).every(v => v >= 1 && v <= 5)) {
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


    if (((rating.cleanliness + rating.communication + rating.neighbours + rating.location) / 4) >= 4.5) {
      await incrementPoints(announcement.owner.toString(), 210)
    }

    await sendNotification(userID, announcement.owner,` has rated your property with ${((rating.cleanliness + rating.communication + rating.neighbours + rating.location) / 4)} stars.`, `/profile/?announcement=${announcementID}`)
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

// done notification
export const deleteReview = async (req, res, next) => {
  const {reviewID} = req.params
  const {_id : userID} = req.user


  try {
    const review = await Review.findById(reviewID).populate('announcement')
    if (!review) {
      res.status(404)
      throw new Error('this review does not exist')
    }

    if (review.reviewer.toString() !== userID.toString()) {
      res.status(403)
      throw new Error('this review in not yours !')
    }

    await review.deleteOne()
    await unsendNotification(userID, review.announcement.owner, 'has rated your property with #num# stars.')
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