const mongoose = require('mongoose')
const { Schema } = mongoose

const playedGameSchema = new Schema({
  name: { type: String, required: true },
  developers: [String],
  publishers: [String],
  release_year: { type: String },
  played_year: String,
  genres: [String],
  tags: [String],
  score: Number,
  description: String,
  steam_page: String,
  epic_page: String,
  other_stores: [String],
  favorite: { type: Boolean, default: false },
  played_hours: Number,
  cover: String,
  cover_box: String,
  gallery: [String],
  added_at: { type: Date, default: Date() },
  updated_at: { type: Date, default: Date() },
  completion: { type: Schema.Types.ObjectId, ref: 'completion' },
  platform: { type: Schema.Types.ObjectId, ref: 'platform' },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
})

module.exports = mongoose.model('playedGame', playedGameSchema)
