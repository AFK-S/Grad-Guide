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
    const food_debit_response = await TransactionSchema.aggregate([
      {
        $match: {
          owner_id: user_id,
          type: 'debit',
          type_of_transaction: 'food',
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
    const travel_debit_response = await TransactionSchema.aggregate([
      {
        $match: {
          owner_id: user_id,
          type: 'debit',
          type_of_transaction: 'travel',
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
    const entertainment_debit_response = await TransactionSchema.aggregate([
      {
        $match: {
          owner_id: user_id,
          type: 'debit',
          type_of_transaction: 'entertainment',
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
    const miscellaneous_debit_response = await TransactionSchema.aggregate([
      {
        $match: {
          owner_id: user_id,
          type: 'debit',
          type_of_transaction: 'miscellaneous',
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
    res.json({
      food_debit_response,
      travel_debit_response,
      entertainment_debit_response,
      miscellaneous_debit_response,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

router.get('/graph/:user_id', async (req, res) => {
  const { user_id } = req.params
  try {
    const food_transactions = await TransactionSchema.aggregate([
      {
        $match: {
          owner_id: user_id,
          type_of_transaction: 'food',
          type: 'debit',
        },
      },
      {
        $group: {
          _id: 0,
          amount: {
            $avg: '$amount',
          },
        },
      },
      {
        $project: {
          _id: 0,
          amount: { $ceil: '$amount' },
        },
      },
    ])
    const travel_transactions = await TransactionSchema.aggregate([
      {
        $match: {
          owner_id: user_id,
          type_of_transaction: 'travel',
          type: 'debit',
        },
      },
      {
        $group: {
          _id: 0,
          amount: {
            $avg: '$amount',
          },
        },
      },
      {
        $project: {
          _id: 0,
          amount: { $ceil: '$amount' },
        },
      },
    ])
    const entertainment_transactions = await TransactionSchema.aggregate([
      {
        $match: {
          owner_id: user_id,
          type_of_transaction: 'entertainment',
          type: 'debit',
        },
      },
      {
        $group: {
          _id: 0,
          amount: {
            $avg: '$amount',
          },
        },
      },
      {
        $project: {
          _id: 0,
          amount: { $ceil: '$amount' },
        },
      },
    ])
    const miscellaneous_transactions = await TransactionSchema.aggregate([
      {
        $match: {
          owner_id: user_id,
          type_of_transaction: 'miscellaneous',
          type: 'debit',
        },
      },
      {
        $group: {
          _id: 0,
          amount: {
            $avg: '$amount',
          },
        },
      },
      {
        $project: {
          _id: 0,
          amount: { $ceil: '$amount' },
        },
      },
    ])
    res.json({
      food_transactions,
      travel_transactions,
      entertainment_transactions,
      miscellaneous_transactions,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

export default router
