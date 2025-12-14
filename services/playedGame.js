const mongoose = require('mongoose')
const playedGameModel = require('../models/playedGame')
const completionService = require('../services/completion')

/**
 * @param {Object} playedGame
 * @throws {Error}
 */
module.exports.handler = {
  async get() {
    const result = await playedGameModel
      .find()
      .populate(['user', 'completion', 'platform'])
    return result
  },
  async getById(id) {
    const result = await playedGameModel
      .findById(id)
      .populate(['user', 'completion', 'platform'])
      .catch((error) => {
        throw new Error('Game not Found')
      })
    return result
  },
  async getByUser(user, page = 1, limit = 50, filterData) {
    const games = await playedGameModel
      .find({ 
        user,
        ...filterData
      })
      .limit(limit * page)
      .sort({
        favorite: -1 ,
        score: -1,
        name: -1
      })
      .populate(['user', 'completion', 'platform'])
      .catch((error) => {
        console.log(error)
        throw new Error(error.message)
      })
    const max = await playedGameModel.count({user, ...filterData})
    const result = {
      games,
      page,
      max
    }
    return result
  },
  async getPlayingGames(user) {
    const completion = await completionService.handler.getByName('Playing')
    const result = await playedGameModel
      .find({ user, completion: completion._id })
      .populate(['user', 'completion', 'platform'])
      .catch((error) => {
        throw new Error(error.message)
      })
    return result
  },
  async getStats(user) {
    const games = await playedGameModel
      .find({ user })
      .populate(['completion', 'platform'])
      .catch((error) => {
        throw new Error(error.message)
      })
    try {
      return compileStats(games)
    } catch (error) {
      throw new Error(`An Error has ocurred: ${error.message}`)
    }
    
  },
  async create(playedGame) {
    const created = await playedGameModel
      .create(playedGame)
      .catch((error) => {
        throw new Error(error.message)
      })
    const result = await this.getById(created._id)
    return result
  },
  async update(playedGame) {
    playedGame.updated_at = new Date()
    let result = await playedGameModel
      .findByIdAndUpdate(playedGame, playedGame, { new: true })
      .populate(['user', 'completion', 'platform'])
      .catch((error) => {
        throw new Error(error.message)
      })
    if (!result?._id) {
      throw new Error('Game not found')
    }
    return result
  },
  async delete(id) {
    let result = await playedGameModel.deleteOne({ _id: id }).catch((error) => {
      throw new Error('Game not found')
    })
    return result
  },
}

function compileStats(games) {
  const totalGames = games.length
  // const avgScore = games.reduce((game, currentValue) =>  currentValue += game.score ?? 6, 0) / totalGames 

  let playedYearDatasets = {}
  let yearDatasets = {}
  let platformDatasets = {}
  let scoreDatasets = {}
  let genreDatasets = {}
  let developerDataset = {}
  let publisherDataset = {}
  let completionDatasets = {}

  games.forEach(element => {
    // PLATFORMS
    if (element.platform)
      platformDatasets[element.platform.name] >= 1 
        ? platformDatasets[element.platform.name]++
        : platformDatasets[element.platform.name] = 1

    // RELEASE YEARS
    if (element.release_year)
      yearDatasets[element.release_year.toString()] >= 1
        ? yearDatasets[element.release_year.toString()]++
        : yearDatasets[element.release_year.toString()] = 1

    // PLAYED YEARS
    if (element.played_year)
      playedYearDatasets[element.played_year.toString()] >= 1
        ? playedYearDatasets[element.played_year.toString()]++
        : playedYearDatasets[element.played_year.toString()] = 1

    // SCORES
    if (element.score)
      scoreDatasets[element.score.toString()] >= 1
        ? scoreDatasets[element.score.toString()]++
        : scoreDatasets[element.score.toString()] = 1

    // GENRES
      if (element.genres?.length) {
        element.genres.forEach((genre) => {
          genreDatasets[genre] >= 1 ? genreDatasets[genre]++ : genreDatasets[genre] = 1
        })
      }

    // DEVELOPERS
    if (element.developers?.length) {
      element.developers.forEach((developer) => {
        developerDataset[developer] >= 1 ? developerDataset[developer]++ : developerDataset[developer] = 1
      })
    }
    
    // PUBLISHERS
    if (element.publishers?.length) {
      element.publishers.forEach((publisher) => {
        publisherDataset[publisher] >= 1 ? publisherDataset[publisher]++ : publisherDataset[publisher] = 1
      })
    }

    // COMPLETIONS
    if (element.completion)
      completionDatasets[element.completion.name] >= 1
        ? completionDatasets[element.completion.name]++
        : completionDatasets[element.completion.name] = 1
  });

  // Comnbine mismatched case for developer names
  try {
    const developers = Object.keys(developerDataset)
    const dataSetsToDelete = []
    for (let indexA = 0; indexA < developers.length; indexA++) {
      for (let indexB = indexA + 1; indexB < developers.length; indexB++) {
        // Exclude studio Inc. from comparisons
        if (developers[indexA] !== "Inc.") {
          // If names are the same increase the first one and delete the second
          if (developers[indexA].toLowerCase().replaceAll(' ', '') === developers[indexB].toLowerCase().replaceAll(' ', '')) {
            developerDataset[developers[indexA]] += developerDataset[developers[indexB]]
            dataSetsToDelete.push(developers[indexB])
          } 
          // If first one has many and includes the second
          else if ((developers[indexA].includes('/') || developers[indexA].includes(' , ') || developers[indexA].includes('.')) && developers[indexA].toLowerCase().replaceAll(' ', '').includes(developers[indexB].toLowerCase().replaceAll(' ', ''))) {
            developerDataset[developers[indexB]] += developerDataset[developers[indexA]]
          } 
          // If second contains first
          else if ((developers[indexB].includes('/') || developers[indexB].includes(' , ') || developers[indexB].includes('.')) && developers[indexB].toLowerCase().replaceAll(' ', '').includes(developers[indexA].toLowerCase().replaceAll(' ', ''))) {
            developerDataset[developers[indexA]] += developerDataset[developers[indexB]]
          }
        }
      }
    }
    dataSetsToDelete.forEach(element => {
      delete developerDataset[element]
    });
  } catch (error) {
    console.log(error)
  }

  return {
    totalGames,
    completionDatasets,
    platformDatasets,
    developerDataset,
    publisherDataset,
    yearDatasets,
    playedYearDatasets,
    scoreDatasets,
    genreDatasets
  }

}
