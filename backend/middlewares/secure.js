import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const secure = () => {

  return async (req, res, next) => {
    try {
      const token = req.cookies.tigerToken
      // console.log('token', token)
      if (!token) {
        req.user = {}
        next()
        return
      }
      const verified = jwt.verify(token, process.env.JWT_SECRET)

      if (!verified) {
        req.user = {}
        next()
        return
      }
      const {userID} = verified
      const user = await User.findById(userID).populate('extra')
      
      if (!user) {
        req.user = {}
        next()
        return
      } 
      req.user = user
      next()
      return
    } catch (err) {
      next(err)
    }
  }

}

export default secure