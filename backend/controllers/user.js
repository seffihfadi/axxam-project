// import bcrypt from 'bcrypt'
// import twilio from 'twilio'

import jwt from 'jsonwebtoken'
import User from "../models/User.js"
import UserDetails from '../models/UserExtraDetails.js'
import { isPhone } from '../utils/func.js'
import cloudinary from '../utils/cloudinary.js'
import { stripe } from '../utils/stripe.js'
import ROLES from '../utils/roles.js'
import mongoose from 'mongoose'


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
  return jwt.sign({userID}, process.env.JWT_SECRET, {expiresIn: '50d'})
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




/// update the main info:
export const updateUserMain = async (req, res ,next) => {
  const {newFullname, newBirthDate, newAvatar} = req.body
  const {_id: sessionID} = req.user
  const {userID} = req.params

  try {
    if( sessionID.toString() !== userID.toString()){
      res.status(401)
      throw new error('you can\'t update this account.')
    }

    const user = await User.findOne({sessionID})
    if(!user){
      res.status(400)
      throw new error ('user not found')
    }
    const updatedDoc = {
      fullName : newFullname || user.fullName,
      birthDate : newBirthDate || user.birthDate
    }   
    if (newAvatar !== '') {
      const {secure_url: url} = await cloudinary.uploader.upload(newAvatar, {
        folder: "Zoquix",
      })
      updatedDoc.avatar = url
    }
    
    const updatedUser = await User.findByIdAndUpdate(sessionID, updatedDoc)
    if (!updatedUser) {
      res.status(500)
      throw new Error('failed to update profile')
    }
    return res.status(200).json({message: 'updated successfuly'})
    }catch(err){
      next(err)
    }
  }


// update the secondary info :
export const updateUserAdditional = async (req, res ,next) => {
  const {newBio, newGender, newLivesIn} = req.body
  const {_id: sessionID , extra : userDetailsID} = req.user
  const {userID} = req.params

  try {
  const user = await User.findOne({sessionID})
  if(!user){
    res.status(400)
    throw new error('user do not exist')
  }

  if(sessionID.toString() !== userID.toString()){
    res.status(401)
      throw new error('you can\'t update this account.')
    }
    let userDetails = await UserExtraDetails.findById(userDetailsID)
    if(!userDetails){
      res.status(400)
      throw new error('details does not exist')
    }

    const updatedDoc = {
      bio : newBio || userDetails.bio,
      gender : newGender || userDetails.gender,
      livesIn : newLivesIn || userDetails.livesIn 
    }  

    const updatedUser = await UserExtraDetails.findByIdAndUpdate(userDetailsID, updatedDoc)
    if (!updatedUser) {
      res.status(500)
      throw new Error('failed to update profile')
    }
    return res.status(200).json({message: 'updated successfuly'})
  }catch(err){
    next(err)
  }
}

export const joinUs = async (req, res, next) => {
  const {_id: sessionID, extra} = req.user
  const {idCard, email, bio, gender} = req.body
  try {
    // const userDetailsID = extra?._id || new mongoose.Types.ObjectId()
    // console.log('req.ip', req.ip)

    if (!idCard || !email || !bio || !gender) {
      res.status(400)
      throw new Error('please fill in all requered fields')
    }

    // if (role === ROLES.lessor[0]){
    //   res.status(400)
    //   throw new Error('you are already a lessor')
    // }

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
      throw new Error('somthing went wrong with Stripe account creation!')
    }

    // const externalAccount = await stripe.accounts.createExternalAccount(
    //   account.id,
    //   {
    //     external_account: 'btok_1NAiJy2eZvKYlo2Cnh6bIs9c',
    //   }
    // );

    
    const userDetails = await UserDetails.findOneAndUpdate(
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


export const addCard = async (req, res, next) => {
  const user = req.user;
  const {token} = req.body;
  try {
      const card = await stripe.accounts.createExternalAccount(
          user.extra.stripeAccountId,
          {
              external_account: token.id,
              
            //  currency: 'dzd'
          }
      )
      res.json(card)
  } catch (error) {
    next(error)
  }
}