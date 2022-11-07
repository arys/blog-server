const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password_hash: {
    type: String,
    required: true,
  }
}, { timestamps: true })

mongoose.model('User', userSchema)