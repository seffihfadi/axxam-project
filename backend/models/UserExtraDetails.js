import {model, Schema, Types} from 'mongoose'

const userDetailsSchema = new Schema({
  bio: {
    type: String,
    min: 5,
    max: 255, 
    default: ''
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', ''],
    default: ''
  },
  points: {
    type: Number,
    default: 0
  },

  // idCard: {
  //   type: String,
  //   default: ''
  // },
  saved: [{
    type: Types.ObjectId,
    ref: 'Announcement'
  }],

  livesIn: {
    type: String,
    default: ''

  }, 
  stripeAccountId: {
    type: String
  }

})


const UserDetails = model('UserExtraDetails', userDetailsSchema)
export default UserDetails