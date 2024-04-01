import Announcement from '../models/Announcement.js'
import cloudinary from '../utils/cloudinary.js'
import User from '../models/User.js'
import UserExtraDetails from '../models/UserExtraDetails.js'


export const createAnnouncement = async (req, res ,next) => {
  try {
    const {_id: owner} = req.user
    // const {owner} = req.params
    const { title ,
            desc ,
            price ,
            location ,
            periode ,
            rules ,
            maxPersons ,
            tags , 
            images , 
            ...otherData
            } = req.body

// verification of the user             
    const user = await User.findById(owner)
    if (!user){
      res.status(404)
      throw new Error('USER NOT FOUND.')
    }


// verification of properties 
    if(typeof title !== 'string' || title === '' || typeof desc !== 'string' || desc === '' || price === 0 || typeof price !== 'number' || typeof location.name !=='string' || location.name === '' || location.coordinates.length != 2 || !['small','long'].includes(periode) || tags.length > 10  || tags.length < 5 || maxPersons < 1){
      res.status(400)
      throw new Error('enter the required information.')
    }
    if(rules !== undefined && rules !== null){
      if(rules.length > 6){
        res.status(400)
        throw new Error('rules must be less than 6')
      }
    }

    const avatars = []
// verification of images 
    const imagesFiltered = images.filter((image)=> !['' , null , undefined].includes(image))
    if(imagesFiltered.length >15 || imagesFiltered.length < 5){
    // if(imagesFiltered.length >5 || imagesFiltered.length < 3){
      res.status(400)
      throw new Error('The number of images must be more than 5 and less than 15.')
    }

// uploading the images 
    for (const image of imagesFiltered){
        try{
          const {secure_url , public_id  } = await cloudinary.uploader.upload(image, {
          folder: "Zoquix"
          })
          avatars.push({secure_url  , public_id})
        }catch(err){
          for (const image of avatars){
            try{
              await cloudinary.uploader.destroy(image.public_id , {folder : "Zoquix"})
            }catch(err){
              next(err)
            }
          }
          const error = new Error ('verify your images')
          res.status(400)
          next(error)
        } 
    }

// creating an announcement
    const announcement = await Announcement.create({
          owner,
          title ,
          desc ,
          price ,
          location ,
          periode ,
          rules ,
          maxPersons ,
          tags ,
          ...otherData,
          images: avatars
        })
      
    if(!announcement){
      res.status(500).json({error : 'A problem has occurred. Please try again.'})
    }
    return res.status(201).json({message : 'announcement created', announcement})
  } catch (err) {
    next(err)
  }
}


export const updateAnnouncement = async (req, res, next)=>{
  const {_id: sessionID} = req.user
  const { newTitle ,
          newDesc ,
          newPrice ,
          newLocation ,
          newPeriode ,
          newIsAvailable ,
          newIsVisible ,
          newIsColocation , 
          newRules ,
          newMaxPersons ,
          newTags , 
          newReductions , 
          newImages // array (can be void)
        } = req.body
  const {announcementID} = req.params

  try {
    const announcement = await Announcement.findById(announcementID)
    if(!announcement){
      res.status(404)
      throw new Error('not found')
    }
    
    if (sessionID.toString() !== announcement.owner.toString()){
      res.status(401)
      throw new Error ('Unauthorized')
    }

// verification of undefined and null 
if ([newLocation, newTags, newRules, newImages].some(val => val === undefined || val === null)){
  res.status(400)
  throw new Error('enter all informations.')
}
// verification of properties 
if(typeof (newTitle) != 'string' || newTitle == '' ){
  res.status(400)
  throw new Error('verify your title.')
}
if(  typeof newDesc !== 'string' || newDesc == '' ){
  res.status(400)
  throw new Error('verify your description.')
}
if( typeof newPrice !== 'number' || newPrice == 0){
  res.status(400)
  throw new Error('verify your price.')
}
if(typeof newLocation.name !=='string' || newLocation.name == '' || newLocation.coordinates.length != 2 ){
  res.status(400)
  throw new Error('verify your location')
}
if(!['small','long'].includes(newPeriode) ){
  res.status(400)
  throw new Error('verify your periode')
}
if(newTags.length > 10  || newTags.length <= 5 ){
  res.status(400)
  throw new Error('verify your tags')
}
if(typeof newMaxPersons != 'number' || newMaxPersons < 1){
  res.status(400)
  throw new Error('verify your max persons')
}
if(newRules.length > 6){
  res.status(400)
  throw new Error('rules must be less than 6')
}

    
    const avatars = []
// this removes the empty strings ,null,undefined images from the newImages array
    const newImagesFiltered = newImages.filter((image)=> !['' , null , undefined].includes(image))

    if ( newImagesFiltered.length > 15 || newImagesFiltered.length < 5 && newImagesFiltered.length !== 0){
      // if ( newImagesFiltered.length > 6 || newImagesFiltered.length < 3 && newImagesFiltered.length !== 0){
      res.status(400)
      throw new Error('The number of images must be more than 5 and less than 15.')
    }
      
    for (const image of newImagesFiltered){
        try{
          const {secure_url, public_id } = await cloudinary.uploader.upload(image, {folder: "Zoquix"})
          avatars.push({secure_url, public_id })
        }catch(err){
          for (const avatar of avatars){
            try{
              await cloudinary.uploader.destroy(avatar.public_id , {folder : "Zoquix"})
            }catch(err){
              next(err)
            }
          }
          const error = new Error ('verify your images')
          res.status(400)
          next(error)
        }
    }

    if(newImagesFiltered.length !== 0){
      for (const image of announcement.images){
        try{
          await cloudinary.uploader.destroy(image.public_id , {folder : "Zoquix"})
        }catch(err){
          next(err)
        }
      }
    }

    
    const updatedAnnouncement = {
      title : newTitle ,
      desc : newDesc ,
      price : newPrice ,
      location :  newLocation,
      periode : newPeriode ,
      isAvailable : newIsAvailable ,
      isVisible : newIsVisible ,
      isColocation : newIsColocation ,
      rules : newRules ,
      maxPersons : newMaxPersons ,
      tags : newTags ,
      images : avatars.length ? avatars : announcement.images ,
      reductions : newReductions 
    }

    const theAnnouncement = await Announcement.findByIdAndUpdate(announcementID, updatedAnnouncement, { new: true})
    if (!theAnnouncement) {
      res.status(500)
      throw new Error('failed to update announcement')
    }
    return res.status(200).json({message : 'announcement updated'})
  }catch(err){
    next(err)
  }
}


export const deleteAnnouncement = async (req, res, next) =>{
  const {_id : sessionID} = req.user
  const {announcementID} = req.params
  
try{
  const theAnnouncement = await Announcement.findById(announcementID)
  if (!theAnnouncement) {
    res.status(404)
    throw new Error('Announcement not found')
  }

  if (theAnnouncement.owner.toString() !== sessionID.toString()){
    res.status(401)
    throw new Error("Unauthorized")
  }

  for (const image of theAnnouncement.images){
    try{
      await cloudinary.uploader.destroy(image.public_id , {folder : "Zoquix"})
    }catch(err){
      next(err)
    }
  }
  await theAnnouncement.deleteOne()
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
        res.status(404)
        throw new Error('announcement not found')
    }
    return res.status(200).json({announcement})
  } catch (err) {
    next(err)
  }
}


export const getAnnouncementForSearch = async (req, res, next) =>{
  try {
    const { tags, // string seperated by comas
            location, // the name of the location
            lowerPrice, // number
            higherPrice, // number 
            periode, // 'small' or 'long'
            maxPersons, 
            title, 
            desc } = req.query

// verfications :
    if (periode !== 'small' && periode !== 'long') {
      periode = '';
    }
    


// building the searchQuery :
    const searchQuery = { isVisible: true }

    if (tags) searchQuery.tags = { $in: tags.split(',') }
    if (location) searchQuery.location.name = new RegExp(location, 'i')
    if (lowerPrice && higherPrice) {
      searchQuery.price = { $gte: lowerPrice, $lte: higherPrice }
    } else if (lowerPrice) {
      searchQuery.price = { $gte: lowerPrice }
    } else if (higherPrice) {
      searchQuery.price = { $lte: higherPrice }
    }
    if (periode) searchQuery.periode = periode
    if (maxPersons) searchQuery.maxPersons = maxPersons
    if (title) searchQuery.title = new RegExp(title, 'i')
    if (desc) searchQuery.desc = new RegExp(desc, 'i')
    
    const resultsCount = await Announcement.countDocuments(searchQuery) 
    const announcements = await Announcement.find(searchQuery)
    return res.status(200).json({ announcements, resultsCount})
  
  } catch (err) {
    next(err)
  }
}

export const saveAnnouncement = async (req, res, next)=>{
  try {
    const {_id : sessionID} = req.user
    // const {sessionID} = req.body
    const {announcementID} = req.params

// checking if the user and the announcement exists 
    const user = await User.findById(sessionID)
    if(!user){
      res.status(404)
      throw new Error('USER NOT FOUND.')
    }
    const announcement = await Announcement.findById(announcementID)
    if(!announcement){
      res.status(404)
      throw new Error('ANNOUNCEMENT NOT FOUND.')
    }

    const userDetailsID = user.extra
    const userDetails = await UserExtraDetails.findById(userDetailsID)
    const isAlreadySaved = userDetails.saved.includes(announcementID)
    if(isAlreadySaved){
      userDetails.saved.pull(announcementID)
      var msg = 'announcement saved.'
    }else{
      userDetails.saved.push(announcementID)
      var msg = 'announcement removed from saved list.'
    }
    const updatedUserDetails = await UserExtraDetails.findByIdAndUpdate(userDetailsID, userDetails)
    if(!updatedUserDetails){
      res.status(500)
      throw new Error('INTERNAL ERROR.')
    }
    return res.status(200).json({message : msg})
  }catch(err){
    next(err)
  }
}
