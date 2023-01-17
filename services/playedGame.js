const mongoose = require('mongoose')
const playedGameModel = require('../models/playedGame')
const completionService = require('../services/completion')

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
  async getPlayingGames(user) {
    const completion = await completionService.handler.getByName('Playing')
    const result = await playedGameModel
      .find({ user, completion: completion._id  })
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
