import Notification from "../models/Notification.js"

// done
export const sendNotification = async (from, to, note, link) => {
  await Notification.create({from, to, note, link}) 
}

// done
export const unsendNotification = async (from, to, note) => {
  const noteTodelete = await Notification.findOne({from, to, note, seen: false})
  if (!!note) {
    await noteTodelete.deleteOne()
  } 
}

// done
export const getNotifications = async (req, res, next) => {
  const {_id: sessionID} = req.user
  try {
    const notifications = await Notification.aggregate
    ([
      {
        $match: {
          to: sessionID,
          //seen: false // Filter only unseen notifications
        }
      },
      {
        $group: {
          _id: {
            note: '$note',
            from: '$from'
          },
          count: {
            $sum: 1 // Count the number of notifications in each group
          },
          seen: {
            $first: '$seen' // Capture the 'seen' value (assuming all 'seen' values within a group are the same)
          },
          createdAt: {
            $first: '$createdAt'
          },
          link: {
            $first: '$link'
          },
          fromUser: {
            $first: '$fromUser' // Capture the populated 'fromUser' value
          },
        }
      },
      {
        $sort: {
          seen: 1 ,
          createdAt: -1, 
        }
      },
      {
        $project: {
          _id: 0, // Exclude the '_id' field from the result
          from: '$_id.from', // Include 'to' from the grouping key
          note: '$_id.note', // Include 'note' from the grouping key
          count: 1, // Include the count
          seen: 1 ,// Include the 'seen' value
          createdAt: 1,
          link: 1
          
        }
      },
    ])
    
    const redNotes = await Notification.populate(notifications, {path: "from", select: ['image', 'fullname']})
    res.status(200).json(redNotes)

  } catch (error) {
    next(error)
  }
}

// done
export const seenNotification = async (req, res, next) => {
  const {note, from, to} = req.body
  try {
    await Notification.updateMany({note, from, to, seen: false}, {seen: true})
    res.status(200).json({message: 'seen'})
  } catch (error) {
    next(error)
  }
}