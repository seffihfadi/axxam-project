
import Announcement from '../models/Announcement.js'
import cloudinary from '../utils/cloudinary.js'
import { getPublicIDFromUrl } from '../utils/func.js'


export const createAnnouncement = async (req, res) => {
  try {
    const {_id: owner} = req.user
    const { title,
            desc,
            price,
            location,
            periode,
            isAvailable,
            isVisible,
            isColocation,
            rules,
            maxPersons,
            tags,
            images,
            reductions } = req.body
    const avatars = []

    for (const image of images){
      const {secure_url: url} = await cloudinary.uploader.upload(image, {
        folder: "Zoquix"
    })
    avatars.push(url)
    }

    const announcement = await Announcement.create({
      owner,
      title,
      desc,
      price,
      location,
      periode,
      isAvailable,
      isVisible,
      isColocation,
      rules,
      maxPersons,
      tags,
      avatars,
      reductions
    })
    return res.status(200).json({
      announcement,
    })
  } catch (err) {
    next(err)
  }
}


export const updateAnnouncement = async (req, res, next)=>{

  try {
    const {_id: sessionID} = req.user
    const { newTitle,
            newDesc,
            newPrice,
            newLocation,
            newPeriode,
            newIsAvailable,
            newIsVisible,
            newIsColocation,
            newRules,
            newMaxPersons,
            newTags,
            newImages,
            newReductions } = req.body
    const {announcementID} = req.params
    
    if (sessionID.toString() !== announcementID.owner.toString()){
      res.status(401)
      throw error ('Unauthorized')
    }
    const announcement = Announcement.findById({announcementID})
    const avatars = []

    if (!!newImages){
      for (const image of announcement.images){
        const publicIP = getPublicIDFromUrl(image)
        await cloudinary.uploader.destroy(publicIP , {folder : "Zoquix"})
      }
      for (const image of newImages){
          const {secure_url: url} = await cloudinary.uploader.upload(image, {
          folder: "Zoquix"
          })
          avatars.push(url)
      }
    }

    const updatedAnnouncement = {
      title : newTitle || announcement.title,
      desc : newDesc || announcement.desc,
      price : newPrice || announcement.price,
      location : newLocation || announcement.location,
      periode : newPeriode || announcement.periode,
      isAvailable : newIsAvailable || announcement.isAvailable,
      isVisible : newIsVisible || announcement.isVisible,
      isColocation : newIsColocation || announcement.isColocation,
      rules : newRules || announcement.rules,
      maxPersons : newMaxPersons || announcement.maxPersons,
      tags : newTags || announcement.tags,
      images : avatars || announcement.images,
      reductions : newReductions || announcement.reductions
    }

    const theAnnouncement = await Announcement.findByIdAndUpdate(announcementID, updatedAnnouncement)
    if (!theAnnouncement) {
      res.status(500)
      throw new Error('failed to update announcement')
    }
    return res.status(200).json({
        theAnnouncement,
    })
  }catch(err){
    next(err)
  }
}


export const deleteAnnouncement = async (req, res, next) =>{
    const {_id : sessionID} = req.user
    const {announcementId} = req.params

  try{
    const theAnnouncement = await Announcement.findById(announcementId)
    if (!theAnnouncement) {
      res.status(404)
      throw new error('Announcement not found')
    }

    if (TheAnnouncement.owner.toString() !== sessionID.toString()){
      res.status(401)
      throw new error("you can\'t delete this announcement !")
    }
    await TheAnnouncement.deleteOne()
    return res.status(200).json({message: 'announcement deleted'})
  }catch (err){
    next(err)
  }
}


export const getAnnouncement = async (req, res, next) => {
  const {announcementID} = req.params

  try {
    const announcement = await Announcement.findById(announcementID)
    if (!announcement){
        res.status(400)
        throw new error('announcement not found')
    }
    return res.status(200).json(announcement)
  } catch (error) {
    next(error)
  }
}