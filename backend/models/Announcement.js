import {model, Schema, Types} from 'mongoose'

const announcementSchema = new Schema({
  owner: {
    type: Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
    min: 20,
    max: 255,
  },
  price: {
    type: Number, 
    required: true
  },
  location: {
    name: String, // wilaya && baladia ex: Setif, Guellal Boutaleb
    coordinates: {
      type: [Number],
      validate: {
        validator: function(v) {
          return v.length == 2 // [Longitude, Latitude]
        },
        message: props => `${props.value} is not a valid coordinate pair`
      },
      required: true
    }
  },
  periode: {
    type: String,
    enum: ['small','long'],
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  isColocation: {
    type: Boolean,
    default: false
  },
  rules: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length < 6
      },
      message: props => `The number of rules must be less than 6.`
    },
  },
  maxPersons: {
    type: Number,
    required: true,
    min: 1 
  },
  tags: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length > 5 && v.length < 10
      },
      message: props => `The number of tags must be more than 5 and less than 10.`
    },
  },
  images: {
    type: [{secure_url: String, public_id: String}],
    required: true,
    validate: {
      validator: function(v) {
        return v.length > 5 && v.length < 15
      },
      message: props => `The number of images must be more than 5 and less than 15.`
    },
  },
  reductions: { /// % persentage
    adults: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    children: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    infants: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  }
}, {
  timestamps: true
})

const Announcement = model('Announcement', announcementSchema)
export default Announcement