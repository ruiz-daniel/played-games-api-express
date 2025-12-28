const mongoose = require('mongoose')
const { Schema } = mongoose

const singleListSchema = new Schema({
  games: [{ type: Schema.Types.ObjectId, ref: 'playedGame' }],
  name: { type: String,  unique: false }, 
  user: { type: Schema.Types.ObjectId, ref: 'user' }
})

module.exports = mongoose.model('singleList', singleListSchema)
