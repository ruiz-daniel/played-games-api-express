const axios = require('axios');
const moment = require('moment');
const igdbUrl = "https://api.igdb.com/v4"
const clientId = process.env.IGDB_CLIENT_ID
const clientSecret = process.env.IGDB_CLIENT_SECRET

const credentialsUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`

const getGameFields = "id, name, release_dates.platform.name, release_dates.human, release_dates.y, release_dates.m, summary, involved_companies.company.name, involved_companies.developer, involved_companies.publisher, cover.url, url, genres.name"

const getHeaders = (token) => {
  return {
    "Client-ID": clientId,
    Authorization: `Bearer ${token}`,
    "Content-Type": "text/plain"
  }
}

/**
 * 
 * @throws {Error}
 */
module.exports.handler = {
  async getCredentials() {
    const response = await axios.post(credentialsUrl)
    const {access_token, expires_in, token_type} = response.data
    return {access_token, expires_in, token_type}
  },
  async getByName(name, token) {
    const parsedName = `%${name.split(" ").join("%%")}%`
    const response = await axios.request({
      method: "post",
      url: `${igdbUrl}/games`,
      data: `fields ${getGameFields}; where name ~ "${parsedName}";`,
      headers: getHeaders(token)
    })
    const data = response.data
    return data
  },
}