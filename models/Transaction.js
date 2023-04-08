import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema(
  {
    owner_id: {
      type: String,
      required: [true, 'Please add a Owner ID'],
    },
    name: {
      type: String,
      trim: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9]+$/,
        (props) => `${props.value} is not a valid username`,
      ],
      required: [true, 'Please add a Username'],
    },
    type_of_transaction: {
      type: String,
      trim: true,
      enum: ['travel', 'food', 'entertainment', 'miscellaneous', 'lend'],
      match: [
        /^(travel|food|entertainment|miscellaneous|lend)$/,
        (props) => `${props.value} is not a valid type of transaction`,
      ],
      required: [true, 'Please add a Type of Transaction'],
    },
    status: {
      type: String,
      trim: true,
      enum: ['completed', 'borrowed'],
      match: [
        /^(completed|borrowed)$/,
        (props) => `${props.value} is not a valid status`,
      ],
      default: 'completed',
      required: [true, 'Please add a Status'],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.connection
  .useDb('GradGuide')
  .model('Transaction', TransactionSchema)
