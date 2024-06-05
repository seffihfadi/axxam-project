import express from 'express';
import access from '../middlewares/auth.js';
import secure from '../middlewares/secure.js';
import ROLES from '../utils/roles.js'
import { 
  sendOTPSignup,
  sendOTPSignin, 
  verifyOTP,
  signoutUser,
  signupUser,
  joinUs,
  updateUserAdditional,
  updateUserMain,
  getUser,
  switchRole, 
  getUserByID
} from '../controllers/user.js';

const userRoutes = express.Router();

userRoutes.post('/signin/send-otp', sendOTPSignin);
userRoutes.post('/signup/send-otp', sendOTPSignup);
userRoutes.post('/join-us', access(ROLES.lessee), joinUs);
userRoutes.post('/verify-otp', verifyOTP);
userRoutes.get('/signout', signoutUser);
userRoutes.patch('/update-main', access(ROLES.all), updateUserMain);
userRoutes.patch('/update-additional', access(ROLES.all), updateUserAdditional);
userRoutes.patch('/signup', signupUser);
userRoutes.get('/get-user', access(ROLES.all), getUser);
userRoutes.patch('/switch-role', access(ROLES.all), switchRole);
userRoutes.get('/get-user-by-id/:userID', secure(), getUserByID);
export default userRoutes

// //forgot password token
// router.post('/forgot-password-token',forgotPasswordToken)
// // update password
// router.put('/update-password',authMiddleWare,updatePassword)
// //reset password 
// router.put('/reset-password/:token',resetPassword)
