import express from 'express'
import { body } from 'express-validator'
import TransactionSchema from '../models/Transaction.js'

const router = express.Router()

router.post(
  '/register/transaction',
  body('user_id').not().isEmpty().withMessage('User ID is required'),
  body('type_of_transaction').not().isEmpty().withMessage('Title is required'),
  body('amount').not().isEmpty().withMessage('Amount is required'),
  body('Status').not().isEmpty().withMessage('Status is required'),
  async (req, res) => {
    const { user_id, type_of_transaction, amount, status } = req.body
    try {
      await TransactionSchema.create({
        owner_id: user_id,
        type_of_transaction,
        amount,
        status,
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
    const transaction_response = await TransactionSchema.findById(
      user_id,
    ).lean()
    res.send(transaction_response)
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

export default router
