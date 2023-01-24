const favoriteListService = require('../services/favoriteList')

exports.getLists = async (req, res, next) => {
  const response = await favoriteListService.handler
    .get(req.user?._id)
    .catch((error) => {
      res.status(400)
      return error
    })
  res.send(response)
}

exports.getListById = async (req, res, next) => {
  const response = await favoriteListService.handler
    .getById(req.params.id)
    .catch((error) => {
      res.status(400)
      return error
    })
  res.send(response)
}

exports.createList = async (req, res, next) => {
  if (req.body) {
    req.body.user = req.user
  }
  const response = await favoriteListService.handler
    .create(req.body)
    .catch((error) => {
      res.status(400)
      return error
    })
  res.send(response)
}

exports.updateList = async (req, res, next) => {
  const response = await favoriteListService.handler
    .update(req.body)
    .catch((error) => {
      res.status(400)
      return error
    })
  res.send(response)
}

exports.deleteList = async (req, res, next) => {
  const response = await favoriteListService.handler
    .delete(req.params.id)
    .catch((error) => {
      res.status(400)
      return error
    })
  res.send(response)
}
