import express from 'express'
import { body } from 'express-validator'
import UserSchema from '../models/User.js'

const router = express.Router()

router.post(
  '/register/user',
  body('name').not().isEmpty().withMessage('Name is required'),
  body('email_address')
    .not()
    .isEmpty()
    .withMessage('Email Address is required')
    .isEmail()
    .withMessage('Invalid Email Address'),
  body('phone_number').not().isEmpty().withMessage('Phone Number is required'),
  body('age').not().isEmpty().withMessage('AGe is required'),
  body('dob').not().isEmpty().withMessage('Date of Birth is required'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 12 })
    .withMessage('Password must be between 6 and 12 characters'),
  async (req, res) => {
    const { name, email_address, phone_number, age, dob, password } = req.body
    try {
      const user_response = await UserSchema.create({
        name,
        email_address,
        phone_number,
        age,
        dob,
        password,
      })
      res.send(user_response._id)
    } catch (error) {
      console.log(error)
      res.status(400).send(error.message)
    }
  },
)

router.put(
  '/login',
  body('email_address')
    .not()
    .isEmpty()
    .withMessage('Email Address is required')
    .isEmail()
    .withMessage('Invalid Email Address'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 12 })
    .withMessage('Password must be between 6 and 12 characters'),
  async (req, res) => {
    const { email_address, password } = req.body
    try {
      const user_response = await UserSchema.findOne({
        email_address,
        password,
      })
      if (user_response === null) {
        return res.status(400).send('Invalid Credentials')
      }
      res.send(user_response._id)
    } catch (error) {
      console.log(error)
      res.status(400).send(error.message)
    }
  },
)

router.get('/user/:user_id', async (req, res) => {
  const { user_id } = req.params
  try {
    const user_detail = await UserSchema.findById(user_id).lean()
    res.send(user_detail)
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

export default router
