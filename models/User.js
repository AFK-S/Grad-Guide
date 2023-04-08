import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      match: [/^[a-zA-Z ]+$/, (props) => `${props.value} is not a valid name`],
      required: [true, 'Please add a Name'],
    },
    email_address: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
        (props) => `${props.value} is not a valid email`,
      ],
      required: [true, 'Please add an Email Address'],
      unique: true,
    },
    phone_number: {
      type: String,
      match: [
        /^[0-9]{10}$/,
        (props) => `${props.value} is not a valid phone number`,
      ],
      required: [true, 'Please add a Phone Number'],
    },
    age: {
      type: Number,
      required: [true, 'Please add a Age'],
    },
    dob: {
      type: String,
      required: [true, 'Please add a Date of Birth'],
    },
    password: {
      type: String,
      required: [true, 'Please add a Password'],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.connection.useDb('GradGuide').model('User', UserSchema)
