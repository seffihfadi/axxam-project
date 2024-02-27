import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import twilio from 'twilio'
import User from "../models/User.js"


export const sendOTP = async (req, res, next) => {
  const { phone, isSignup } = req.body
  const otp = Math.floor(100000 + Math.random() * 900000).toString() // 6 digit
  const otpExpiry = new Date(Date.now() + 12e4) // 2 minutes from now

  try {
    if (!phone || !isSignup) {
      res.status(400)
      throw new Error('phone number is required')
    }
    
    const user = await User.updateOne({ phone }, { phone, otp, otpExpiry }, { upsert: isSignup })

    if (!user && !isSignup) {
      res.status(400)
      throw new Error('user not found, create another account')
    }
    
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const twilioClient = new twilio(accountSid, authToken)

    await twilioClient.messages.create({
      body: `Your OTP is ${otp}`,
      to: phone,
      from: process.env.TWILIO_PHONE_NUMBER, //1CP4K88XWS82BF94K7JHGQSF
    })

    return res.json({ message: 'OTP sent successfully' }) 

  } catch (error) {
    next(error)
  }
}

export const verifyOTP = async (req, res, next) => {
  const { phone, otp } = req.body

  try {
    const user = await User.findOne({ phone, otp })

    if (!user) {
      res.status(400)
      throw new Error('OTP is invalid')
    }

    if (user.otpExpiry < Date.now()) {
      res.status(400)
      throw new Error('OTP has expired')
    }

    // user.otp = null
    user.otpExpiry = new Date()
    await user.save()

    return res.json({ message: 'OTP verified successfully' })

  } catch (error) {
    next(error)
  }
}








// const generateToken = (userID) => {
//   return jwt.sign({ userID }, process.env.JWT_SECRET, {expiresIn: '1d'})
// }

// export const signupUser = async (req, res, next) => {
//   const { email, fullname, password, motivation, field } = req.body
//   try {

//     if (!fullname || !email || !password || !field ){
//       res.status(400)
//       throw new Error('please fill in all required fields')
//     } 

//     const user = await User.findOne({email})
//     if (!!user) {
//       res.status(409)
//       throw new Error('user already exsits !')
//     }
    
//     const newUser = await User.create({
//       email, 
//       fullname, 
//       password, 
//       motivation,
//       field
//     })
//     if (!newUser) {
//       res.status(500)
//       throw new Error('account not created, please try later.')
//     }

//     const {_id} = newUser

//     // create token
//     const token = generateToken(_id)
//     res.cookie('tigerToken', token, {
//       httpOnly: true,
//       expires: new Date(Date.now() + 864e5),
//       secure: true,
//       sameSite: 'none',
//       path: '/'
//     })

//     res.status(201).json({message: 'signup seccessfuly'})
//   } catch (error) {
//     next(error)
//   }
// }

// export const signinUser = async (req, res, next) => {
//   const {email, password} = req.body

//   try {
//     if (!email || !password) {
//       res.status(400)
//       throw new Error('fill in required fields.')
//     }
//     const user = await User.findOne({email}).select(['password', '_id'])
//     if (!user) {
//       res.status(404)
//       throw new Error('user not found, you can create new accout.')
//     }

//     const hashPass = user.password
//     const isMatch = bcrypt.compareSync(password, hashPass)
//     if (!isMatch) {
//       res.status(400)
//       throw new Error('wrong password !')
//     } 

//     // create token
//     const token = generateToken(user._id)
//     res.cookie('tigerToken', token, {
//       httpOnly: true,
//       expires: new Date(Date.now() + 864e5),
//       secure: true,
//       sameSite: 'none',
//       path: '/'
//     })
//     res.status(200).json({message: 'signin successfuly'})
//   } catch (error) {
//     next(error)
//   }
// }

// export const signoutUser = async (req, res, next) => {

//   try {
//     res.cookie('tigerToken', '', {
//       expires: new Date(0),
//       sameSite: 'none',
//       secure: true
//     })
//     res.status(200).json({message: 'successfuly logged out'})
//   } catch (err) {
//     next(err)
//   }

// }

// export const getUser = async (req, res, next) => {
  
//   try {
//     if(!req.user) {
//       res.status(500)
//       throw new Error('server error !')
//     }

//     const userSession = req.user
//     userSession.password = undefined
//     res.status(200).json({user: userSession})
    
//   } catch (error) {
//     next(error)
//   }
// }

// export const getAllUsers = async (req, res, next) => {
//   const search = req.query.search
//   try {
//     const usersSearchQuery = search 
//     ? 
//       { $or: [
//         {email: { $regex: search }}, 
//         {fullname: { $regex: search }},
//         {role: { $regex: search }},
//         {field: { $regex: search }}
//       ]} 
//     : 
//       {}
//     const users = await User.find(usersSearchQuery).select('-password')
//     res.status(200).json(users)
  
//   } catch (error) {
//     next(error)
//   }
// }