import { Schema, model, Types } from 'mongoose';

const paymentSchema = new Schema({
  paymentIntentId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['awaiting', 'paid', 'refunded'],
    default: 'awaiting'
  },
  amount: {
    type: Number,
    required: true
  },
  refundId: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

const Payment = model('Payment', paymentSchema)
export default Payment
