import express from 'express';
import access from '../middlewares/auth.js';
import ROLES from '../utils/roles.js'
import { 
    createAnnouncement,
    updateAnnouncement,
    getAnnouncement,
    deleteAnnouncement
} from '../controllers/announcement.js';

const announcementRoutes = express.Router();

userRoutes.post('/create-announcement',access(ROLES.lessor), createAnnouncement);
userRoutes.patch('/update-announcement/:announcementID',access(ROLES.lessor), updateAnnouncement);
userRoutes.get('/get-announcement/:announcementID',access(ROLES.all), getAnnouncement);
userRoutes.delete('/delete-announcement/:announcementID',access(ROLES.lessor), deleteAnnouncement);



export default announcementRoutes