import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Gigs from './routes/Gigs.js'
import Lend from './routes/Lend.js'
import Transaction from './routes/Transaction.js'
import User from './routes/User.js'
import Community from './routes/Community.js'

const app = express()

try {
  mongoose.set('strictQuery', false)
  mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('Connected to database')
} catch (error) {
  console.log(error)
}

app.use(cors())
app.use(express.json())
app.use('/api', Gigs)
app.use('/api', Lend)
app.use('/api', Transaction)
app.use('/api', User)
app.use('/api', Community)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || 8001, () => {
  console.log(`Server is running on port 8000`)
})
