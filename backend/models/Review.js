import {model, Schema, Types} from 'mongoose'

const reviewSchema = new Schema({
  announcement: {
    type: Types.ObjectId,
    ref: 'Announcement'
  },
  reviewer: {
    type: Types.ObjectId,
    ref: 'User'
  },
  comment: {
    type: String,
    max: 255,
  },
  rating: {
    location: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    cleanliness: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    neighbours: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    communication: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },

}, {
  timestamps: true
})


const Review = model('Review', reviewSchema)
export default Review