import mongoose from 'mongoose'

const LendSchema = new mongoose.Schema(
  {
    owner_id: {
      type: String,
      required: [true, 'Please add a Owner ID'],
    },
    title: {
      type: String,
      trim: true,
      match: [/^[a-zA-Z ]+$/, (props) => `${props.value} is not a valid title`],
      required: [true, 'Please add a Title'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Please add a Description'],
    },
    status: {
      type: String,
      trim: true,
      enum: ['paid', 'unpaid'],
      match: [
        /^(apid|unpaid)$/,
        (props) => `${props.value} is not a valid status`,
      ],
      default: 'unpaid',
      required: [true, 'Please add a Status'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add a Amount'],
    },
    to_id: {
      type: String,
      required: [true, 'Please add a TO ID'],
    },
    due_date: {
      type: Date,
      required: [true, 'Please add a Date of Birth'],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.connection.useDb('GradGuide').model('Lend', LendSchema)
