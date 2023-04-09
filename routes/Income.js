import express from 'express'
import { body } from 'express-validator'
import IncomeSchema from '../models/Income.js'
import TransactionSchema from '../models/Transaction.js'

const router = express.Router()

router.post(
  '/register/income',
  body('user_id').not().isEmpty().withMessage('User ID is required'),
  body('amount').not().isEmpty().withMessage('Amount is required'),
  async (req, res) => {
    const { user_id, amount } = req.body
    try {
      const income_response = await IncomeSchema.findOne({
        owner_id: user_id,
      }).lean()
      if (income_response) {
        await IncomeSchema.findOneAndUpdate(
          { owner_id: user_id },
          { amount: amount },
        )
        return res.send('Successfully Registered')
      }
      await IncomeSchema.create({
        owner_id: user_id,
        amount,
      })
      res.send('Successfully Registered')
    } catch (error) {
      console.log(error)
      res.status(400).send(error.message)
    }
  },
)

router.get('/income/:user_id', async (req, res) => {
  const { user_id } = req.params
  try {
    const income_response = await IncomeSchema.findOne({
      owner_id: user_id,
    }).lean()
    res.send(income_response)
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

router.get('/left_amount/:user_id', async (req, res) => {
  const { user_id } = req.params
  try {
    const debit_response = await TransactionSchema.aggregate([
      {
        $match: {
          owner_id: user_id,
          type: 'debit',
        },
      },
      {
        $group: {
          _id: '$owner_id',
          total: {
            $sum: '$amount',
          },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ])
    const credit_response = await TransactionSchema.aggregate([
      {
        $match: {
          owner_id: user_id,
          type: 'credit',
        },
      },
      {
        $group: {
          _id: '$owner_id',
          total: {
            $sum: '$amount',
          },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ])
    res.json({ credit_response, debit_response })
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

export default router
