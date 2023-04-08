import express from 'express'
import { body } from 'express-validator'
import LendSchema from '../models/Lend.js'

const router = express.Router()

router.post(
  '/register/lend',
  body('user_id').not().isEmpty().withMessage('User ID is required'),
  body('title').not().isEmpty().withMessage('Title is required'),
  body('description').not().isEmpty().withMessage('Description is required'),
  body('to_id').not().isEmpty().withMessage('TO ID is required'),
  body('amount').not().isEmpty().withMessage('Amount is required'),
  body('due_date').not().isEmpty().withMessage('Due Date is required'),
  body('Status').not().isEmpty().withMessage('Status is required'),
  async (req, res) => {
    const {
      user_id,
      title,
      description,
      to_id,
      amount,
      due_date,
      status,
    } = req.body
    try {
      await LendSchema.create({
        owner_id: user_id,
        title,
        description,
        to_id,
        amount,
        due_date,
        status,
      })
      res.send('Successfully Registered')
    } catch (error) {
      console.log(error)
      res.status(400).send(error.message)
    }
  },
)

router.get('/lend/:user_id', async (req, res) => {
  const { user_id } = req.params
  try {
    const lend_response = await LendSchema.findById(user_id).lean()
    res.send(lend_response)
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

export default router
