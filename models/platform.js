const mongoose = require('mongoose')
const { Schema } = mongoose

const platformSchema = new Schema({
  code: {type: String, unique: true, required: true},
  name: {type: String, unique: true, required: true},
  shortName: {type: String, unique: true, required: true},
})

module.exports = mongoose.model('platform', platformSchema)