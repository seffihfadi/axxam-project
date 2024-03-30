import express from 'express';
import access from '../middlewares/auth.js';
import ROLES from '../utils/roles.js'
import { 
  sendOTPSignup,
  sendOTPSignin, 
  verifyOTP,
  signoutUser,
  signupUser,
  updateUserAdditional,
  updateUserMain
} from '../controllers/user.js';

const userRoutes = express.Router();

userRoutes.post('/send-otp-signin', sendOTPSignin);
userRoutes.post('/send-otp-signup', sendOTPSignup);
userRoutes.post('/verify-otp', verifyOTP);
userRoutes.patch('/signup', signupUser);
userRoutes.get('/signout', signoutUser);
userRoutes.patch('/update-main',access(ROLES.all), updateUserMain);
userRoutes.patch('/update-additional',access(ROLES.lessor), updateUserAdditional);

// userRoutes.get('/get-users', access(ROLES.all), getAllUsers);

// userRoutes.get('/get-user', access(ROLES.all), getUser);


export default userRoutes

// //forgot password token
// router.post('/forgot-password-token',forgotPasswordToken)
// // update password
// router.put('/update-password',authMiddleWare,updatePassword)
// //reset password 
// router.put('/reset-password/:token',resetPassword)
