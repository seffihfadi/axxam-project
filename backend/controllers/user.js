// import bcrypt from 'bcrypt'
// import twilio from 'twilio'

import jwt from 'jsonwebtoken'
import User from "../models/User.js"
import { isPhone } from '../utils/func.js'
import cloudinary from '../utils/cloudinary.js'



export const sendOTPSignup = async (req, res, next) => {
  const { phone } = req.body
  const otpExpiry = new Date(Date.now() + 12e4) // 2 minutes from now
  const OTPCode = 147852

  try {

    if (!isPhone(phone)) {
      res.status(400)
      throw new Error('phone number is invalid')
    }
    
    const user = await User.findOne({phone})

    if (!!user) {
      if (user.isCompleted) {
        res.status(409)
        throw new Error('account already exists, please login.')
      }
      await User.updateOne({ phone }, { OTPCode, otpExpiry });
    } else {
      await User.create({ phone, OTPCode, otpExpiry });
    }

    return res.json({ message: 'OTP sent successfully' }) 

  } catch (error) {
    next(error)
  }
}

export const sendOTPSignin = async (req, res, next) => {
  const { phone } = req.body
  const otpExpiry = new Date(Date.now() + 12e4) // 2 minutes from now
  const OTPCode = 147852

  try {
    if (!isPhone(phone)) {
      res.status(400)
      throw new Error('phone number is invalid')
    }
    
    
    const user = await User.findOne({phone})
    
    if (!user) {
      res.status(404)
      throw new Error('user not found, create a new account')
    }

    if (!user.isCompleted) {
      res.status(409)
      throw new Error('this account was not completed')
    }
    
    await User.updateOne({ phone }, { OTPCode, otpExpiry });

    return res.json({ message: 'OTP sent successfully' }) 

  } catch (error) {
    next(error)
  }
}

export const verifyOTP = async (req, res, next) => {
  const { phone, otp } = req.body

  
  try {
    const user = await User.findOne({ phone, OTPCode: otp })

    if (!user) {
      res.status(400)
      throw new Error('OTP is invalid')
    }

    if (user.otpExpiry < Date.now()) {
      res.status(400)
      throw new Error('OTP has expired, try again.')
    }

    await User.updateOne(user, {isVerified: true})

    if (user.isCompleted) {
      // create token
      const {_id, phone} = user
      const token = generateToken(_id)
      res.cookie('tigerToken', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 864e5),
        secure: true,
        sameSite: 'none',
        path: '/'
      })

      return res.status(200).json({message: 'signin seccessfuly'})

    }

    return res.json({ message: 'OTP verified successfully' })

  } catch (error) {
    next(error)
  }
}


const generateToken = (userID) => {
  return jwt.sign({userID}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

export const signupUser = async (req, res, next) => {
  const { fullname, birthDate, image, phone } = req.body
  console.log('{ fullname, birthDate, image, phone }', { fullname, birthDate, image, phone })
  try {
    if (!fullname || !birthDate || !phone ){
      res.status(400)
      throw new Error('please fill in all required fields')
    } 

    const user = await User.findOne({phone, isVerified: true})
    if (!user) {
      res.status(404)
      throw new Error('you must first validate your phone number')
    }


    let avatar = ''
    if (!!image) {
      const {secure_url: url} = await cloudinary.uploader.upload(image, {
        folder: "Zoquix",
      })
      avatar = url
    }
    
    const newUser = await User.updateOne(
      { phone }, 
      { fullname, birthDate, avatar: avatar, isCompleted: true }
    )

    if (!newUser) {
      res.status(500)
      throw new Error('an error was accured, please try later.')
    }

    // create token
    const token = generateToken(newUser._id)
    res.cookie('tigerToken', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 864e5),
      secure: true,
      sameSite: 'none',
      path: '/'
    })
    
    res.status(201).json({message: 'signup seccessfuly'})
  } catch (error) {
    next(error)
  }
}

export const signoutUser = async (req, res, next) => {

  try {
    res.cookie('tigerToken', '', {
      expires: new Date(0),
      sameSite: 'none',
      secure: true
    })
    res.status(200).json({message: 'successfuly logged out'})
  } catch (err) {
    next(err)
  }

}

export const updateUserMain = async (req, res ,next) => {
  const {newFullname, newBirthDate, newImage} = req.body
  const {_id : sessionID} = req.user
  // const {userID} = req.params

  try {
    const user = await User.findOne({sessionID})
    // const user = await User.findById(userID)
    const userID = user._id
    if(!user){
      res.status(404)
      throw new Error('user not found')
    }

    if( sessionID.toString() !== userID.toString()){
      res.status(401)
      throw new Error('UNAUTHORIZED')
    }

    const updatedDoc = {
      fullname : newFullname || user.fullname,
      birthDate : newBirthDate || user.birthDate,
      avatar : user.avatar
    }   
    if (!!newImage) {
      const {secure_url: url} = await cloudinary.uploader.upload(newImage, {folder: "Zoquix"})
      updatedDoc.avatar = url
    }
    
    // const updatedUser = await User.findByIdAndUpdate(sessionID, updatedDoc)
        const updatedUser = await User.findByIdAndUpdate(userID, updatedDoc , { runValidators: true , new: true})
    if (!updatedUser) {
      res.status(500)
      throw new Error('failed to update profile')
    }
    return res.status(200).json({updatedUser})
    }catch(err){
      next(err)
    }
  }

export const updateUserAdditional = async (req, res ,next) => {
  const {newBio, newGender, newLivesIn} = req.body
  const {_id: sessionID , extra : userDetailsID} = req.user
  // const {userID} = req.params
  
  try {

    const user = await User.findById(sessionID)

    if(!user){
      res.status(404)
      throw new Error('user not found')
    }

    const userID = user._id
    if(sessionID.toString() !== userID.toString()){
      res.status(401)
      throw new Error('UNAUTHORIZED')
    }

    // const user = await User.findById(userID)
    // const userDetailsID = user.extra

    if(!userDetailsID){
      var updatedUser = await UserExtraDetails.create({bio : newBio, gender : newGender, livesIn : newLivesIn})
      user.extra = updatedUser._id
      await User.findByIdAndUpdate(userID , user , {new: true})
    }else{
      const userDetailed = await UserExtraDetails.findById(userDetailsID)
      if(!userDetailed){
        res.status(404)
        throw new Error('details not found')
      }
      const updatedDoc = {
        bio : newBio || userDetailed.bio ,
        gender : newGender || userDetailed.gender ,
        livesIn : newLivesIn || userDetailed.livesIn 
      }  
      var updatedUser = await UserExtraDetails.findByIdAndUpdate(userDetailsID, updatedDoc, {new: true})
    }

    if (!updatedUser) {
      res.status(500)
      throw new Error('failed to update profile')
    }
    return res.status(200).json({message: 'updated successfuly'})
  }catch(err){
    next(err)
  }
}


// export const sendOTP = async (req, res, next) => {
//   const { phone, isSignup } = req.body
//   const otp = Math.floor(100000 + Math.random() * 900000).toString() // 6 digit
//   const otpExpiry = new Date(Date.now() + 12e4) // 2 minutes from now
//   const OTPCode = 147852


//   try {
//     if (!isPhone(phone) || !isSignup) {
//       res.status(400)
//       throw new Error('phone number is invalid')
//     }
    
//     const user = await User.updateOne(
//       { phone }, 
//       { phone, OTPCode, otpExpiry }, 
//       { upsert: strToBool(isSignup) }
//     )

//     if (!user.upsertedId && !strToBool(isSignup)) {
//       res.status(400)
//       throw new Error('user not found, create another account')
//     }
    
//     // const accountSid = process.env.TWILIO_ACCOUNT_SID
//     // const authToken = process.env.TWILIO_AUTH_TOKEN
//     // const twilioClient = new twilio(accountSid, authToken)

//     // await twilioClient.messages.create({
//     //   body: `Your OTP is ${otp}`,
//     //   to: phone,
//     //   from: process.env.TWILIO_PHONE_NUMBER, //1CP4K88XWS82BF94K7JHGQSF
//     // })

//     return res.json({ message: 'OTP sent successfully' }) 

//   } catch (error) {
//     next(error)
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
