import express from 'express';
import access from '../middlewares/auth.js';
import secure from '../middlewares/secure.js';
import ROLES from '../utils/roles.js'
import { 
    createAnnouncement,
    updateAnnouncement,
    getAnnouncement,
    deleteAnnouncement,
    saveAnnouncement,
    getAnnouncementForSearch,
    getAnnouncementLessor
} from '../controllers/announcement.js';

const announcementRoutes = express.Router();

announcementRoutes.post('/create',access(ROLES.lessor), createAnnouncement);
announcementRoutes.patch('/update/:announcementID',access(ROLES.lessor), updateAnnouncement);
announcementRoutes.get('/save/:announcementID', access(ROLES.all), saveAnnouncement);
announcementRoutes.get('/get/:announcementID', secure(), getAnnouncement);
announcementRoutes.get('/search', secure(), getAnnouncementForSearch);
announcementRoutes.get('/getsd/announcementLessor',access(ROLES.lessor), getAnnouncementLessor);
announcementRoutes.delete('/delete/:announcementID',access(ROLES.lessor), deleteAnnouncement);


export default announcementRoutes