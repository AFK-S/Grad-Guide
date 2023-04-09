import mongoose from 'mongoose'

const IncomeSchema = new mongoose.Schema(
  {
    owner_id: {
      type: String,
      required: [true, 'Please add a Owner ID'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add a Amount'],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.connection
  .useDb('GradGuide')
  .model('Income', IncomeSchema)
