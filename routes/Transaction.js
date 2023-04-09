import express from 'express'
import { body } from 'express-validator'
import TransactionSchema from '../models/Transaction.js'
import IncomeSchema from '../models/Income.js'

const router = express.Router()

router.post(
  '/register/transaction',
  body('user_id').not().isEmpty().withMessage('User ID is required'),
  body('type_of_transaction').not().isEmpty().withMessage('Title is required'),
  body('amount').not().isEmpty().withMessage('Amount is required'),
  async (req, res) => {
    const { user_id, type_of_transaction, type, amount } = req.body
    try {
      await TransactionSchema.create({
        owner_id: user_id,
        type_of_transaction,
        amount,
        type,
        date:
          new Date().getDate() +
          '/' +
          new Date().getMonth() +
          '/' +
          new Date().getFullYear(),
      })
      res.send('Successfully Registered')
    } catch (error) {
      console.log(error)
      res.status(400).send(error.message)
    }
  },
)

router.get('/transaction/:user_id', async (req, res) => {
  const { user_id } = req.params
  try {
    const transaction_response = await TransactionSchema.find({
      owner_id: user_id,
    }).lean()
    res.send(transaction_response)
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

router.get('/transactions/predict/:user_id', async (req, res) => {
  const { user_id } = req.params
  try {
    const pocket_money = await IncomeSchema.findOne({
      owner_id: user_id,
    }).distinct('amount')
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
            $sum: '$amount',
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
            $sum: '$amount',
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
            $sum: '$amount',
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
            $sum: '$amount',
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
      pocket_money: pocket_money,
      food: food_transactions,
      travel: travel_transactions,
      entertainment: entertainment_transactions,
      miscellaneous: miscellaneous_transactions,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

export default router
