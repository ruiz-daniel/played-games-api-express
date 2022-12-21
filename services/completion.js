const mongoose = require('mongoose')
const completionModel = require('../models/completion')

/**
 * @param {Object} completion
 * @throws {Error}
 */
module.exports.handler = {
  async get() {
    const result = await completionModel.find()
    return result
  },
  async getByName(name) {
    const result = await completionModel.findOne({ name: name }).catch(error => {
      throw new Error('Completion Not found')
    })
    return result
  },
}
