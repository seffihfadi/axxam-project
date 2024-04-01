import express from 'express'
import access from '../middlewares/auth.js'
import ROLES from '../utils/roles.js'
import { getNotifications, seenNotification } from '../controllers/notifications.js'

const notificationsRoutes = express.Router()

notificationsRoutes.route('/').get(access(ROLES.all), getNotifications)
// notificationsRoutes.get('/' ,getNotifications)
notificationsRoutes.route('/seen').patch(access(ROLES.all), seenNotification)

export default notificationsRoutes