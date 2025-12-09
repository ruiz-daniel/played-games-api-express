const mongoose = require('mongoose')
const tierListModel = require('../models/tierList')

/**
 * @param {Object} favoriteList
 * @throws {Error}
 */

module.exports.handler = {
  async get(userid) {
    const result = await tierListModel
      .find({ user: userid })
      .populate(['tiers'])
    return result
  },
  async getById(id) {
    const result = await tierListModel
      .findById(id)
      .populate(['tiers'])
      .catch((error) => {
        throw new Error('List not Found')
      })
    return result
  },
  async create(favoriteList) {
    const result = await tierListModel
      .create(favoriteList)
      .catch((error) => {
        throw new Error(error.message)
      })
    return result
  },
  async update(favoriteList) {
    let result = await tierListModel
      .findByIdAndUpdate(favoriteList, favoriteList, { new: true })
      .catch((error) => {
        throw new Error(error.message)
      })
    if (!result?._id) {
      throw new Error('Game not found')
    }
    return result
  },
  async delete(id) {
    let result = await tierListModel
      .deleteOne({ _id: id })
      .catch((error) => {
        throw new Error('List not found')
      })
    return result
  },
}
