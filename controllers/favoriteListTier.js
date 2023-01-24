const favoriteListTierService = require('../services/favoriteListTier')

exports.getTier = async (req, res, next) => {
  const response = await favoriteListTierService.handler
    .getById(req.params.id)
    .catch((error) => {
      res.status(400)
      return error
    })
  res.send(response)
}

exports.updateTier = async (req, res, next) => {
  const response = await favoriteListTierService.handler
    .update(req.body)
    .catch((error) => {
      res.status(400)
      return error
    })
  res.send(response)
}

exports.deleteTier = async (req, res, next) => {
  const response = await favoriteListTierService.handler
    .delete(req.params.id)
    .catch((error) => {
      res.status(400)
      return error
    })
  res.send(response)
}
