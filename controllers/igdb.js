// import { handler } from "../services/igdb"
const igdbService = require("../services/igdb")

exports.getCredentials = async (req, res, next) => {
  const response = await igdbService.handler.getCredentials().catch(error => {
      res.status(400)
      return error
    })
    res.send(response)
}

exports.getByName = async (req, res, next) => {
  const name = req.params.name
  const bearerToken = req.body.access_token
  if (bearerToken && name) {
    const response = await igdbService.handler.getByName(name, bearerToken).catch(error => {
      res.status(400)
      return error
    })
    res.send(response)
  }
  res.status(400)
}

