import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema(
  {
    owner_id: {
      type: String,
      required: [true, 'Please add a Owner ID'],
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
    amount: {
      type: Number,
      required: [true, 'Please add a Amount'],
    },
    type: {
      type: String,
      trim: true,
      enum: ['credit', 'debit'],
      match: [
        /^(credit|debit)$/,
        (props) => `${props.value} is not a valid type`,
      ],
      required: [true, 'Please add a Type'],
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
    date: {
      type: String,
      required: [true, 'Please add a Transaction Date'],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.connection
  .useDb('GradGuide')
  .model('Transaction', TransactionSchema)
