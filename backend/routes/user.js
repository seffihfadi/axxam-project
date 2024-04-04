import express from 'express';
import access from '../middlewares/auth.js';
import ROLES from '../utils/roles.js'
import { 
  sendOTPSignup,
  sendOTPSignin, 
  verifyOTP,
  signoutUser,
  signupUser,
  joinUs,
  addCard
} from '../controllers/user.js';

const userRoutes = express.Router();

userRoutes.post('/signin/send-otp', sendOTPSignin);
userRoutes.post('/signup/send-otp', sendOTPSignup);
userRoutes.post('/join-us', access(ROLES.all), joinUs);
userRoutes.post('/add-card', access(ROLES.all), addCard);
userRoutes.post('/verify-otp', verifyOTP);
userRoutes.patch('/signup', signupUser);
userRoutes.get('/signout', signoutUser);
// userRoutes.get('/get-users', access(ROLES.all), getAllUsers);

// userRoutes.get('/get-user', access(ROLES.all), getUser);


export default userRoutes

// //forgot password token
// router.post('/forgot-password-token',forgotPasswordToken)
// // update password
// router.put('/update-password',authMiddleWare,updatePassword)
// //reset password 
// router.put('/reset-password/:token',resetPassword)
