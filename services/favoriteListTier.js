const mongoose = require('mongoose')
const favoriteListTierModel = require('../models/favoriteListTier')

/**
 * @param {Object} favoriteListTier
 * @throws {Error}
 */

module.exports.handler = {
  async getById(id) {
    const result = await favoriteListTierModel.findById(id).catch((error) => {
      throw new Error('Tier not Found')
    })
    return result
  },
  async update(favoriteListTier) {
    let result = await favoriteListTierModel
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
    let result = await favoriteListTierModel
      .deleteOne({ _id: id })
      .catch((error) => {
        throw new Error('Tier not found')
      })
    return result
  },
}
