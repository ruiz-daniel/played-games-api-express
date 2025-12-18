const singleListService = require('../services/singleList')

exports.getTier = async (req, res, next) => {
  const response = await singleListService.handler
    .get(req.user?._id)
    .catch((error) => {
      res.status(400)
      return error.message
    })
  res.send(response)
}

exports.getTierById = async (req, res, next) => {
  const response = await singleListService.handler
    .getById(req.params.id)
    .catch((error) => {
      res.status(400)
      return error
    })
  res.send(response)
}

exports.createTier = async (req, res, next) => {
  const response = await singleListService.handler
    .create({...req.body, user: req.user._id})
    .catch((error) => {
      res.status(400)
      return error
    })
  res.send(response)
}

exports.updateTier = async (req, res, next) => {
  const response = await singleListService.handler
    .update(req.body)
    .catch((error) => {
      res.status(400)
      return error
    })
  res.send(response)
}

exports.deleteTier = async (req, res, next) => {
  const response = await singleListService.handler
    .delete(req.params.id)
    .catch((error) => {
      res.status(400)
      return error
    })
  res.send(response)
}
