import {model, Schema, Types} from 'mongoose'

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    match: [/^(?=.{4,18}$)[a-zA-Z]+ [a-zA-Z]+$/, "{VALUE} is not a valid fullname"]
  },
  phone: {
    type: String, 
    required: true,
    unique: true,
    match: [/^0[5-7]\d{8}$/, "Please fill a valid phone number"]
  },
  birthDate: {
    type: Date,
    required: true
  },
  OTPCode: {
    type: Number,
  },
  otpExpiry: {
    type: Date,
    required: true
  },
  role: {
    type: String,
    enum: ['Lessor', 'Lessee'],
    default: 'Lessee'
  }, 
  avatar: {
    type: String,
    default: ''
  },
  extra: {
    type: Types.ObjectId,
    ref: 'UserExtraDetails'
  },
  isVerified: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
})


// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')){
//     return next()
//   }else {
//     // encrypt password 
//     const salt = bcrypt.genSaltSync(10)
//     const hashPass = bcrypt.hashSync(this.password, salt)
//     this.password = hashPass
//     next()

//   }
// })


const User = model('User', userSchema)
export default User