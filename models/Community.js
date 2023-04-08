import mongoose from 'mongoose'

const CommunitySchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: [true, 'Please add a User ID'],
    },
    title: {
      type: String,
      required: [true, 'Please add a Title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a Description'],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.connection
  .useDb('GradGuide')
  .model('Community', CommunitySchema)
