import express from 'express'
import { body } from 'express-validator'
import GigsSchema from '../models/Gigs.js'

const router = express.Router()

router.post(
  '/register/gigs',
  body('user_id').not().isEmpty().withMessage('User ID is required'),
  body('title').not().isEmpty().withMessage('Title is required'),
  body('description').not().isEmpty().withMessage('Description is required'),
  body('location').not().isEmpty().withMessage('Description is required'),
  body('price').not().isEmpty().withMessage('Price is required'),
  async (req, res) => {
    const {
      user_id,
      title,
      description,
      location,
      price,
      submission_type,
      status,
    } = req.body
    try {
      await GigsSchema.create({
        user_id,
        title,
        description,
        location,
        price,
      })
      res.send('Successfully Registered')
    } catch (error) {
      console.log(error)
      res.status(400).send(error.message)
    }
  },
)

router.get('/gigs/:user_id', async (req, res) => {
  const { user_id } = req.params
  try {
    const gigs_response = await GigsSchema.aggregate([
      {
        $match: {
          user_id,
        },
      },
      {
        $addFields: {
          user_id: {
            $toObjectId: '$user_id',
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
    ])
    res.send(gigs_response)
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

router.get('/gigs', async (req, res) => {
  try {
    const gigs_response = await GigsSchema.aggregate([
      {
        $addFields: {
          user_id: {
            $toObjectId: '$user_id',
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
    ])
    res.send(gigs_response)
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

router.delete('/gigs/:gigs_id', async (req, res) => {
  const { gigs_id } = req.params
  try {
    await GigsSchema.findByIdAndDelete(gigs_id)
    res.send('Successfully Deleted')
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

export default router
