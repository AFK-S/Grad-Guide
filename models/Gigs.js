import mongoose from 'mongoose'

const GigsSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: [true, 'Please add a User ID'],
    },
    title: {
      type: String,
      required: [true, 'Please add a Title'],
    },
    location: {
      type: String,
      match: [
        /^[a-zA-Z ]+$/,
        (props) => `${props.value} is not a valid username`,
      ],
      required: [true, 'Please add a Location'],
    },
    description: {
      type: String,
      required: [true, 'Please add a Description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a Prize'],
    },
    submission_type: {
      type: String,
      trim: true,
      enum: ['online', 'offline'],
      match: [
        /^(online|offline)$/,
        (props) => `${props.value} is not a valid submission type`,
      ],
      default: 'online',
      required: [true, 'Please add a Submission Type'],
    },
    status: {
      type: String,
      trim: true,
      enum: ['active', 'resolved'],
      match: [
        /^(active|resolved)$/,
        (props) => `${props.value} is not a valid status`,
      ],
      default: 'active',
      required: [true, 'Please add a Status'],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.connection.useDb('GradGuide').model('Gigs', GigsSchema)
