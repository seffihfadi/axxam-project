import { Schema, model, Types } from "mongoose"

const notificationSchema = new Schema({
  to: {
    type: Types.ObjectId,
    ref: 'User'
  },
  from: {
    type: Types.ObjectId,
    ref: 'User'
  },
  note: {
    type: String
  },
  link: {
    type: String
  },
  seen: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})
const Notification = model('Notification', notificationSchema)

export default Notification