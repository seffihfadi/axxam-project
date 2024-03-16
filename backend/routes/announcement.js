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

announcementRoutes.post('/create',access(ROLES.lessor), createAnnouncement);
announcementRoutes.patch('/update/:announcementID',access(ROLES.lessor), updateAnnouncement);
announcementRoutes.get('/get/:announcementID',access(ROLES.all), getAnnouncement);
announcementRoutes.delete('/delete/:announcementID',access(ROLES.lessor), deleteAnnouncement);



export default announcementRoutes