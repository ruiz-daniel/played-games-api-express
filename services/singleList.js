const mongoose = require('mongoose')
const singleListModel = require('../models/singleList')
const { path } = require('../app')

/**
 * @param {Object} favoriteListTier
 * @throws {Error}
 */

module.exports.handler = {
  async get(userid) {
    const result = await singleListModel
      .find({ user: userid })
      .populate({
        path: 'games',
        populate: {
          path: 'completion'
        }
      })
      .catch((error) => {
        throw new Error('Tiers not Found')
      })
    return result
  },
  async getById(id) {
    const result = await singleListModel.findById(id)
    .populate({
        path: 'games',
        populate: {
          path: 'completion'
        }
      })
    .catch((error) => {
      throw new Error('Tier not Found')
    })
    return result
  },
  async create(singleList) {
    const result = await singleListModel
      .create(singleList)
      .catch((error) => {
        throw new Error(error.message)
      })
    return result
  },
  async update(favoriteListTier) {
    let result = await singleListModel
      .findByIdAndUpdate(favoriteListTier, favoriteListTier, { new: true })
      .catch((error) => {
        throw new Error(error.message)
      })
    if (!result?._id) {
      throw new Error('Tier not found')
    }
    return result
  },
  async delete(id) {
    let result = await singleListModel
      .deleteOne({ _id: id })
      .catch((error) => {
        throw new Error('Tier not found')
      })
    return result
  },
}
