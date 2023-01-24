const mongoose = require('mongoose')
const favoriteListModel = require('../models/favoriteList')

/**
 * @param {Object} favoriteList
 * @throws {Error}
 */

module.exports.handler = {
  async get(userid) {
    const result = await favoriteListModel
      .find({ user: userid })
      .populate(['tiers'])
    return result
  },
  async getById(id) {
    const result = await favoriteListModel
      .findById(id)
      .populate(['tiers'])
      .catch((error) => {
        throw new Error('List not Found')
      })
    return result
  },
  async create(favoriteList) {
    const result = await favoriteListModel
      .create(favoriteList)
      .catch((error) => {
        throw new Error(error.message)
      })
    return result
  },
  async update(favoriteList) {
    let result = await favoriteListModel
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
    let result = await favoriteListModel
      .deleteOne({ _id: id })
      .catch((error) => {
        throw new Error('List not found')
      })
    return result
  },
}
