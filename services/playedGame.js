const mongoose = require('mongoose')
const playedGameModel = require('../models/playedGame')

/**
 * @param {Object} playedGame
 * @throws {Error}
 */
module.exports.handler = {
  async get() {
    const result = await playedGameModel
      .find()
      .populate(['user', 'completion', 'platform'])
    return result
  },
  async getById(id) {
    const result = await playedGameModel
      .findById(id)
      .populate(['user', 'completion', 'platform'])
      .catch((error) => {
        throw new Error('Game not Found')
      })
    return result
  },
  async getByUser(user) {
    const result = await playedGameModel
      .find({ user })
      .populate(['user', 'completion', 'platform'])
      .catch((error) => {
        throw new Error(error.message)
      })
    return result
  },
  async create(playedGame) {
    const result = await playedGameModel.create(playedGame).catch((error) => {
      throw new Error(error.message)
    })
    return result
  },
}
