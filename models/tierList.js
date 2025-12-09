const mongoose = require('mongoose')
const { Schema } = mongoose

const tierListSchema = new Schema({
  tiers: [{ type: Schema.Types.ObjectId, ref: 'singleList' }],
  name: { type: String, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
})

module.exports = mongoose.model('tierList', tierListSchema)
