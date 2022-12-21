const platformService = require('../services/platform')

exports.getPlatforms = async (req, res, next) => {
  const response = await platformService.handler.get().catch(error => {
    res.status(400)
    return error
  })
  res.send(response)
}
exports.getPlatformsByName = async (req, res, next) => {
  const response = await platformService.handler.getByName(req.params.name).catch(error => {
    res.status(400)
    return error
  })
  res.send(response)
}