import jwt from 'jsonwebtoken'
import User from "../models/User.js"
import UserExtraDetails from '../models/UserExtraDetails.js'
import { isPhone } from '../utils/func.js'
import cloudinary from '../api/cloudinary.js'
import { stripe } from '../api/stripe.js'
import ROLES from '../utils/roles.js'
import mongoose from 'mongoose'
import { sendSMS } from '../api/twilio.js'

// done
export const sendOTPSignup = async (req, res, next) => {
  const { phone } = req.body
  
  try {

    if (!isPhone(phone)) {
      res.status(400)
      throw new Error('phone number is invalid')
    }

    const otpExpiry = new Date(Date.now() + 12e4) // 2 minutes from now
    const OTPCode = 147852

    // we must pay to send an sms

    // let OTPCode = Math.floor(100000 + Math.random() * 900000)
    // sendSMS(phone, `Axxam verification code is: ${OTPCode}`)

    const user = await User.findOne({phone})
    if (!!user) {
      if (user.isCompleted) {
        res.status(409)
        throw new Error('account already exists, please login.')
      }
      await User.updateOne({ phone }, { OTPCode, otpExpiry }, { runValidators: false });
    } else {
      await User.updateOne({phone},{ phone, OTPCode, otpExpiry }, {upsert: true, runValidators: false})
    }

    return res.json({ message: 'OTP sent successfully' }) 

  } catch (error) {
    next(error)
  }
}


export const sendOTPSignin = async (req, res, next) => {
  const { phone } = req.body
  
  try {
    if (!isPhone(phone)) {
      res.status(400)
      throw new Error('phone number is invalid')
    }

    const otpExpiry = new Date(Date.now() + 12e4) // 2 minutes from now
    const OTPCode = 147852
    
    // we must pay to send an sms

    // let OTPCode = Math.floor(100000 + Math.random() * 900000)
    // sendSMS(phone, `Axxam verification code is: ${OTPCode}`)
    
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

// done
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

// done
const generateToken = (userID) => {
  return jwt.sign({userID}, process.env.JWT_SECRET, {expiresIn: '50d'})
}

// done
export const signupUser = async (req, res, next) => {
  const { fullname, birthDate, image, phone } = req.body

  try {
    // console.log( fullname, birthDate, phone)
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
        width: 200,
        height: 200,
        crop: 'fill',
        gravity: 'face'
      })
      avatar = url
    }
    
    const newUser = await User.findByIdAndUpdate(
      user._id,  
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

// done
export const updateUserMain = async (req, res ,next) => {
  const {newFullname, newBirthDate, newImage} = req.body
  const user = req.user

  try {
    const updatedDoc = {
      fullname : newFullname || user.fullname,
      birthDate : newBirthDate || user.birthDate,
      avatar : user.avatar
    }   
    if (!!newImage) {
      const {secure_url: url} = await cloudinary.uploader.upload(newImage, {folder: "Zoquix"})
      updatedDoc.avatar = url
    }
    
    const updatedUser = await User.findByIdAndUpdate(user._id, updatedDoc , { new: true})
    if (!updatedUser) {
      res.status(500)
      throw new Error('failed to update profile')
    }
    return res.status(200).json({message:'updated successfully'})
    }catch(err){
      next(err)
    }
  }

// done
export const updateUserAdditional = async (req, res ,next) => {
  const {bio, gender, livesIn} = req.body
  const {_id: sessionID, extra} = req.user
  // const newGender = genderO.charAt(0).toUpperCase() + genderO.slice(1).toLowerCase();
  console.log('{bio, gender, livesIn}', {bio, gender, livesIn})
  try {

    if (!bio && !gender && !livesIn) {
      res.status(400)
      throw new Error('you must enter at least one field')
    }
    const userDetails = await UserExtraDetails.findOneAndUpdate(
      { _id: extra?._id || new mongoose.Types.ObjectId() },
      {
        bio,
        gender,
        livesIn
      },
      {
        new: true, 
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    if (!extra?._id) {
      await User.findByIdAndUpdate(sessionID, { extra: userDetails._id })
    }

    return res.status(200).json({message: 'updated successfully'})

  }catch(err){
    next(err)
  }
}


export const joinUs = async (req, res, next) => {
  const {_id: sessionID, extra} = req.user
  const {idCard, email, bio, gender, token} = req.body
  try {

    if (!idCard || !email || !bio || !gender|| !token) {
      res.status(400)
      throw new Error('please fill in all requered fields')
    }

    const account = await stripe.accounts.create({
      type: 'custom',
      country: 'DZ',
      email,
      default_currency: 'dzd',
      capabilities: {
        card_payments: {
          requested: false,
        },
        transfers: {
          requested: true,
        },
      },
     
      business_type: 'company',
      company: {
        name: 'Axxam',
        tax_id: '123456789',
        address: {
          city: 'Algiers',
          country: 'DZ',
          line1: '123 Business St',
          postal_code: '12345',
          state: 'State',
        },
      },
      tos_acceptance: {
        service_agreement: 'recipient',
        date: Math.floor(Date.now() / 1000),
        ip: req.ip,
        
      },
      metadata: {
        lessorID: sessionID.toString()
      }
    })
    
    if (!account) {
      res.status(500)
      throw new Error('something went wrong with Stripe account creation!')
    }

    const bankAccount = await stripe.accounts.createExternalAccount(account.id, {
      external_account: token,
    });

    if (!bankAccount) {
      res.status(500)
      throw new Error('you can not accept payouts, contact us to solve you problem')
    }

    const userDetails = await UserExtraDetails.findOneAndUpdate(
      { _id: extra?._id || new mongoose.Types.ObjectId() },
      {
        bio,
        gender,
        idCard,
        stripeAccountId: account.id,
      },
      {
        new: true, 
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    if (!extra?._id) {
      await User.findByIdAndUpdate(sessionID, { extra: userDetails._id, role: ROLES.lessor[0] })
    }
    await User.findByIdAndUpdate(sessionID, {role: ROLES.lessor[0]})

    res.status(200).json({ message: 'Join us process successful' })
  } catch (err) {
    next(err)
  }

}


export const getUser = async (req, res, next) => {
  
  try {
    if(!req.user) {
      res.status(500)
      throw new Error('server error !')
    }
    console.log('req.user', req.user?.extra)

    const userSession = req.user
    res.status(200).json({user: userSession})
    
  } catch (error) {
    next(error)
  }
}
