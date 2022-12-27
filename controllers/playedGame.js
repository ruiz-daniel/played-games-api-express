const playedGameService = require('../services/playedGame')

exports.getPlayedGames = async (req, res, next) => {
  const response = await playedGameService.handler.get().catch(error => {
    res.status(400)
    return error
  })
  res.send(response)
}
exports.getPlayedGamesById = async (req, res, next) => {
  const response = await playedGameService.handler.getById(req.params.id).catch(error => {
    res.status(400)
    return error
  })
  res.send(response)
}
exports.createPlayedGame = async (req, res, next) => {
  const response = await playedGameService.handler.create(req.body).catch(error => {
    res.status(400)
    return error
  })
  res.send(response)
}