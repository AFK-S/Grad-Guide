import express from 'express'
import { body } from 'express-validator'
import CommunitySchema from '../models/Community.js'

const router = express.Router()

router.post(
  '/register/community',
  body('user_id').not().isEmpty().withMessage('User ID is required'),
  body('title').not().isEmpty().withMessage('Title is required'),
  body('description').not().isEmpty().withMessage('Description is required'),
  async (req, res) => {
    const { user_id, title, description } = req.body
    try {
      await CommunitySchema.create({
        user_id,
        title,
        description,
      })
      res.send('Successfully Registered')
    } catch (error) {
      console.log(error)
      res.status(400).send(error.message)
    }
  },
)

router.get('/community', async (req, res) => {
  try {
    const community_response = await CommunitySchema.aggregate([
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
    res.send(community_response)
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

router.delete('/community/:community_id', async (req, res) => {
  const { community_id } = req.params
  try {
    await CommunitySchema.findByIdAndDelete(community_id)
    res.send('Successfully Deleted')
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

export default router
