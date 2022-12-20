const mongoose = require('mongoose')
const userModel = require('../models/user')

const crypto = require('crypto')

/**
 * @param {Object} user
 * @throws {Error}
 */
module.exports.handler = {
  async get() {
    const result = userModel.find()
    return result
  },
  async login(username, password) {
    let result = await userModel.findOne({
      username: username,
      password: getHashedPassword(password),
    })

    if (result?._id) {
      result = result.toJSON()
    } else {
      throw new Error('Invalid username or password')
    }
    return result
  },
  async register(user) {
    if (user?.password) {
      user.password = getHashedPassword(user.password)
    }

    let result = await userModel.create(user).catch((error) => {
      if (error.keyValue?.username) {
        throw new Error('Username already exists')
      }
    })

    if (result?._id) {
      result = result.toJSON()
    }

    return result
  },
  async update(user) {
    let result = await userModel
      .findByIdAndUpdate(user, user, { new: true })
      .catch((error) => {
        if (error.keyValue?.username) {
          throw new Error('Username already exists')
        }
      })
    if (!result?._id) {
      throw new Error('User not found')
    }
    return result
  },
  async delete(id) {
    let result = await userModel.deleteOne({ _id: id })
    if (!result?._id) {
      throw new Error('User not found')
    } else {
      result = result.toJSON()
    }
    return result
  },
}

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256')
  const hash = sha256.update(password).digest('base64')
  return hash
}
