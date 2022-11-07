const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('./models/Post')
require('./models/User')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(
  process.env.MONGODB_CONNECTION_URL
)

mongoose.connection.on('connected', () => {
  console.log('Connected to database')
})

app.use('/posts', require('./routes/posts'))
app.use('/auth', require('./routes/auth'))

app.listen(3004, () => {
  console.log("Server is running on http://localhost:3004")
})