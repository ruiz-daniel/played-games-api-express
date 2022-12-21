const mongoose = require('mongoose')
const { Schema } = mongoose

const completionSchema = new Schema({
  code: {type: String, unique: true, required: true},
  name: {type: String, unique: true, required: true},
})

module.exports = mongoose.model('completion', completionSchema)