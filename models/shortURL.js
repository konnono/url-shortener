const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortURLSchema = new Schema({
  original: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('ShortURL', shortURLSchema)