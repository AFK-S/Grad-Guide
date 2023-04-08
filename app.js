import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || 8001, () => {
  console.log('Server is running on port 3000')
})
