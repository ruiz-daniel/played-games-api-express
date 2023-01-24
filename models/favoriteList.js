const mongoose = require('mongoose')
const { Schema } = mongoose

const favoriteListSchema = new Schema({
  tiers: [{ type: Schema.Types.ObjectId, ref: 'favoriteListTier' }],
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
})

module.exports = mongoose.model('favoriteList', favoriteListSchema)
