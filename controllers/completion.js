const completionService = require('../services/completion')

exports.getCompletions = async (req, res, next) => {
  const response = await completionService.handler.get().catch(error => {
    res.status(400)
    return error
  })
  res.send(response)
}
exports.getCompletionsByName = async (req, res, next) => {
  const response = await completionService.handler.getByName(req.params.name).catch(error => {
    res.status(400)
    return error
  })
  res.send(response)
}