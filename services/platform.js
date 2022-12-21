const mongoose = require('mongoose')
const platformModel = require('../models/platform')

/**
 * @param {Object} platform
 * @throws {Error}
 */
module.exports.handler = {
  async get() {
    const result = await platformModel.find()
    return result
  },
  async getByName(name) {
    const result = await platformModel.findOne({ name: name }).catch(error => {
      throw new Error('Platform Not found')
    })
    return result
  },
}
