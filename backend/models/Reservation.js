import {model, Schema, Types} from 'mongoose'

const reservationSchema = new Schema({
  announcement: {
    type: Types.ObjectId,
    ref: 'Announcement'
  },
  client: {
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
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending'
  }, // the total that the reserver paied, if rejected the amount back to the reserver
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
  }, 
  paymentDetails: {
    type: Types.ObjectId,
    ref: 'Payment'
  }

}, {
  timestamps: true
})



const Reservation = model('Reservation', reservationSchema)
export default Reservation