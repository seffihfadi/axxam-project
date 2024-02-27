import {model, Schema, Types} from 'mongoose'

const reservationSchema = new Schema({
  announcement: {
    type: Types.ObjectId,
    ref: 'Announcement'
  },
  reviewer: {
    type: Types.ObjectId,
    ref: 'User'
  },
  checkin: {
    type: Date, 
    required: true
  },
  checkout: {
    type: Date, 
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  amount: {  // the total that the reserver paied, if rejected the amount back to the reserver
    type: Number,
    required: true
  },
  guests: {
    adults: {
      type: Number,
      required: true,
      min: 1 
    },
    children: {
      type: Number,
      required: false,
      default: 0
    },
    infants: {
      type: Number,
      required: false,
      default: 0
    }
  }

}, {
  timestamps: true
})



const Reservation = model('Reservation', reservationSchema)
export default Reservation