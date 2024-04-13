import express from 'express';
import access from '../middlewares/auth.js';
import ROLES from '../utils/roles.js'
import { 
    createAnnouncement,
    updateAnnouncement,
    getAnnouncement,
    deleteAnnouncement,
    saveAnnouncement,
    getAnnouncementForSearch
} from '../controllers/announcement.js';

const announcementRoutes = express.Router();

announcementRoutes.post('/create',access(ROLES.lessor), createAnnouncement);
announcementRoutes.patch('/update/:announcementID',access(ROLES.lessor), updateAnnouncement);
announcementRoutes.patch('/save/:announcementID', access(ROLES.all), saveAnnouncement);
announcementRoutes.get('/get/:announcementID',access(ROLES.all), getAnnouncement);
announcementRoutes.get('/search', access(ROLES.all), getAnnouncementForSearch);
announcementRoutes.delete('/delete/:announcementID',access(ROLES.lessor), deleteAnnouncement);



export default announcementRoutes