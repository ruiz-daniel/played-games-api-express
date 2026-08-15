// import { handler } from "../services/igdb"
const igdbService = require("../services/igdb");

exports.getCredentials = async (req, res, next) => {
  const response = await igdbService.handler.getCredentials().catch((error) => {
    res.status(400);
    return error;
  });
  res.send(response);
};

exports.getByName = async (req, res, next) => {
  const name = req.params.name;
  const bearerToken = req.query.access_token;
  const limit = req.query.limit || 30;
  if (bearerToken && name) {
    const response = await igdbService.handler
      .getByName(name, bearerToken, limit)
      .catch((error) => {
        res.status(400);
        return error;
      });
    res.send(response);
  }
  res.status(400);
};
