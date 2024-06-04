import Announcement from "../models/Announcement.js";
import cloudinary from "../api/cloudinary.js";
import User from "../models/User.js";
import UserExtraDetails from "../models/UserExtraDetails.js";

// done
export const createAnnouncement = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const announcement = req.body;

    // verification of properties
    if (
      !(
        announcement.title &&
        announcement.desc &&
        announcement.price &&
        announcement.location.name &&
        ["small", "long"].includes(announcement.periode)
      ) ||
      announcement.location.coordinates.length != 2 ||
      announcement.tags.length > 10 ||
      announcement.tags.length < 5 ||
      announcement.maxPersons < 1
    ) {
      res.status(400);
      throw new Error("enter the required information.");
    }
    if (announcement.rules) {
      if (announcement.rules.length > 6) {
        res.status(400);
        throw new Error("rules must be less than 6");
      }
    }

    // verification of images
    const imagesFiltered = announcement.images.filter(
      (image) => !["", null, undefined].includes(image)
    );
    if (imagesFiltered.length >= 15 || imagesFiltered.length <= 5) {
      res.status(400);
      throw new Error(
        "The number of images must be more than 5 and less than 15."
      );
    }

    const avatars = [];
    // uploading the images
    for (const image of imagesFiltered) {
      try {
        const { secure_url, public_id } = await cloudinary.uploader.upload(
          image,
          { folder: "Zoquix" }
        );
        avatars.push({ secure_url, public_id });
      } catch (err) {
        for (const image of avatars) {
          await cloudinary.uploader.destroy(image.public_id, {
            folder: "Zoquix",
          });
        }
        const error = new Error("verify your images");
        res.status(400);
        next(error);
      }
    }

    announcement.images = avatars;

    // creating an announcement
    const createdAnnouncement = await Announcement.create({
      owner: owner,
      ...announcement,
    });
    if (!createdAnnouncement) {
      res.status(500);
      throw new Error("INTERNAL SERVER ERROR. TRY LATER.");
    }

    return res.status(201).json({ message: "announcement created" });
  } catch (err) {
    next(err);
  }
};

// done
export const updateAnnouncement = async (req, res, next) => {
  const { _id: sessionID } = req.user;

  const { newAnnouncement } = req.body;
  // the images will be the older ones if newAnnouncement.images is empty

  const { announcementID } = req.params;

  try {
    const announcement = await Announcement.findById(announcementID);
    if (!announcement) {
      res.status(404);
      throw new Error("ANNOUNCEMENT NOT FOUND.");
    }
    if (sessionID.toString() != announcement.owner.toString()) {
      res.status(401);
      throw new Error("USER UNAUTHORIZED.");
    }
    // verification of undefined and null
    if (
      [
        newAnnouncement.location,
        newAnnouncement.tags,
        newAnnouncement.rules,
      ].some((val) => !val)
    ) {
      res.status(400);
      throw new Error("enter all informations.");
    }

    // verification of properties
    if (
      !(
        newAnnouncement.title &&
        newAnnouncement.desc &&
        newAnnouncement.price &&
        newAnnouncement.location.name &&
        ["small", "long"].includes(newAnnouncement.periode)
      ) ||
      newAnnouncement.location.coordinates.length != 2 ||
      newAnnouncement.tags.length >= 15 ||
      newAnnouncement.tags.length <= 5 ||
      newAnnouncement.maxPersons < 1
    ) {
      res.status(400);
      throw new Error("verify your information.");
    }
    if (newAnnouncement.rules) {
      if (newAnnouncement.rules.length >= 6) {
        res.status(400);
        throw new Error("rules must be less than 6");
      }
    }

    // this removes the empty strings ,null,undefined images from the newImages array
    const newImagesFiltered = newAnnouncement.images.filter(
      (image) => !["", null, undefined].includes(image)
    );

    if (
      newImagesFiltered.length >= 15 ||
      (newImagesFiltered.length <= 5 && newImagesFiltered.length !== 0)
    ) {
      res.status(400);
      throw new Error(
        "The number of images must be more than 5 and less than 15."
      );
    }

    const avatars = [];
    for (const image of newImagesFiltered) {
      try {
        const { secure_url, public_id } = await cloudinary.uploader.upload(
          image,
          { folder: "Zoquix" }
        );
        avatars.push({ secure_url, public_id });
      } catch (err) {
        for (const avatar of avatars) {
          await cloudinary.uploader.destroy(avatar.public_id, {
            folder: "Zoquix",
          });
        }
        const error = new Error("verify your images");
        res.status(400);
        next(error);
      }
    }

    if (!newImagesFiltered.length) {
      for (const image of announcement.images) {
        await cloudinary.uploader.destroy(image.public_id, {
          folder: "Zoquix",
        });
      }
      newAnnouncement.images = announcement.images;
    } else {
      newAnnouncement.images = avatars;
    }
    const theAnnouncement = await Announcement.findByIdAndUpdate(
      announcementID,
      newAnnouncement,
      { new: true }
    );
    if (!theAnnouncement) {
      res.status(500);
      throw new Error("failed to update announcement");
    }
    return res.status(200).json({ message: "announcement updated" });
  } catch (err) {
    next(err);
  }
};

// done
export const deleteAnnouncement = async (req, res, next) => {
  const { _id: sessionID } = req.user;
  const { announcementID } = req.params;

  try {
    const theAnnouncement = await Announcement.findById(announcementID);
    if (!theAnnouncement) {
      res.status(404);
      throw new Error("Announcement not found");
    }

    if (theAnnouncement.owner.toString() != sessionID.toString()) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    for (const image of theAnnouncement.images) {
      try {
        await cloudinary.uploader.destroy(image.public_id, {
          folder: "Zoquix",
        });
      } catch (err) {
        next(err);
      }
    }
    await theAnnouncement.deleteOne();
    return res.status(200).json({ message: "announcement deleted" });
  } catch (err) {
    next(err);
  }
};

const isSavedAnnouncement = (userSaves, announcementID) => {
  if (!userSaves) {
    return false;
  }
  return !!userSaves.includes(announcementID.toString());
};
// done
export const getAnnouncement = async (req, res, next) => {
  const { announcementID } = req.params;
  const userSaves = req?.user?.extra?.saved;
  // console.log(announcementID)
  try {
    const announcement = await Announcement.findById(announcementID).populate({
      path: "owner",
      select: ["birthDate", "fullname", "phone", "avatar"],
    });
    if (!announcement) {
      res.status(404);
      throw new Error("announcement not found");
    }
    return res.status(200).json({
      ...announcement.toObject(),
      isSaved: isSavedAnnouncement(userSaves, announcementID),
    });
  } catch (err) {
    next(err);
  }
};

// done
export const getAnnouncementForSearch = async (req, res, next) => {
  const { tags, location, lowerPrice, higherPrice } = req.query;

  try {
    // Build the initial search query with mandatory visibility filter
    const searchQuery = { isVisible: true };

    // Handle tags as an array if present
    if (tags) {
      searchQuery.tags = { $in: tags.split(',') };  // Ensures tags are split into an array
    }

    // Use regular expression for location to enable case-insensitive partial matching
    if (location) {
      searchQuery['location.name'] = new RegExp(location, 'i');
    }

    // Handle price range filtering
    if (lowerPrice && higherPrice) {
      searchQuery.price = { $gte: Number(lowerPrice) * 100, $lte: Number(higherPrice) * 100 };
    } else if (lowerPrice) {
      searchQuery.price = { $gte: Number(lowerPrice) * 100 };
    } else if (higherPrice) {
      searchQuery.price = { $lte: Number(higherPrice) * 100 };
    }

    console.log(' searchQuery',  searchQuery)
    // Fetching announcements based on the search query
    const announcements = await Announcement.find(searchQuery);

    // Determine if each announcement is saved by the current user
    const userSaves = new Set(req.user?.extra?.saved || []);
    const modifiedAnnouncements = announcements.map(announcement => {
      const isSaved = userSaves.has(announcement._id.toString());
      return { ...announcement.toJSON(), isSaved };
    });

    // Send the modified announcements as the response
    return res.status(200).json(modifiedAnnouncements);
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

// done
export const saveAnnouncement = async (req, res, next) => {
  try {
    let { _id: sessionID, extra: userDetails } = req.user;
    const { announcementID } = req.params;

    if (!announcementID) {
      return res.status(400).json({ message: "Announcement ID is required." });
    }

    // Check if the announcement exists
    const announcement = await Announcement.findById(announcementID);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not exists" });
    }

    if (!userDetails) {
      userDetails = await UserExtraDetails.create({});
      await User.findByIdAndUpdate(sessionID, { extra: userDetails._id });
    }

    // Determine if the announcement is already saved and toggle the save status
    const index = userDetails.saved.indexOf(announcementID);
    let msg = "";
    if (index !== -1) {
      userDetails.saved.splice(index, 1);
      msg = `${announcement.title} removed from saved list.`;
    } else {
      userDetails.saved.push(announcementID);
      msg = `${announcement.title} saved.`;
    }

    // Save the updated userDetails
    const updatedUserDetails = await UserExtraDetails.findByIdAndUpdate(
      userDetails._id,
      { saved: userDetails.saved },
      { new: true }
    );

    if (!updatedUserDetails) {
      return res
        .status(500)
        .json({ message: "Internal error while updating details." });
    }

    return res.status(200).json({ message: msg });
  } catch (err) {
    next(err);
  }
};
