import express from 'express';
import access from '../middlewares/auth.js';
import ROLES from '../utils/roles.js'
import { 
  sendOTP, 
  verifyOTP
} from '../controllers/user.js';

const userRoutes = express.Router();

userRoutes.post('/send-otp', sendOTP);
userRoutes.post('/verify-otp', verifyOTP);
// userRoutes.get('/signout', signoutUser);
// userRoutes.get('/get-users', access(ROLES.all), getAllUsers);

// userRoutes.get('/get-user', access(ROLES.all), getUser);


export default userRoutes

// //forgot password token
// router.post('/forgot-password-token',forgotPasswordToken)
// // update password
// router.put('/update-password',authMiddleWare,updatePassword)
// //reset password 
// router.put('/reset-password/:token',resetPassword)
