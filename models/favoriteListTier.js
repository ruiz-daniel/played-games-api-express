const mongoose = require('mongoose')
const { Schema } = mongoose

const favoriteListTierSchema = new Schema({
  games: [{ type: Schema.Types.ObjectId, ref: 'playedGame' }],
})

module.exports = mongoose.model('favoriteListTier', favoriteListTierSchema)
