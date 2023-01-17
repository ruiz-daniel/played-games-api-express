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
exports.getPlayedGamesByUser = async (req, res, next) => {
  const response = await playedGameService.handler.getByUser(req.user._id).catch(error => {
    res.status(400)
    return error
  })
  res.send(response)
}
exports.createPlayedGame = async (req, res, next) => {
  if (req.body) {
    req.body.user = req.user
  }
  const response = await playedGameService.handler.create(req.body).catch(error => {
    res.status(400)
    return error
  })
  res.send(response)
}
exports.getPlayingGames = async (req, res, next) => {
  const response = await playedGameService.handler.getPlayingGames(req.user?._id).catch(error => {
    res.status(400)
    return error
  })
  res.send(response)
}