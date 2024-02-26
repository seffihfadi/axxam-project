import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const access = (roles) => {

  return async (req, res, next) => {
    try {
      const token = req.cookies.tigerToken
      if (!token) {
        res.status(403)
        throw new Error('session expired, please login')
      }
      const verified = jwt.verify(token, process.env.JWT_SECRET)

      if (!verified) {
        res.status(401)
        throw new Error('something went wrong, please login')
      }
      const {userID} = verified
      const user = await User.findById(userID)   // .select('-password')
      if (!user) {
        res.status(401)
        throw new Error('user not found, something went wrong, please login')
      } 

      if (!roles.includes(user.role)) {
        res.status(403)
        throw new Error('not authorised to access this route')
      }

      req.user = user
      next()
    } catch (err) {
      next(err)
    }
  }

}

export default access