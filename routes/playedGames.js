var express = require('express');
var router = express.Router();
var authenticate = require('../authenticateMiddleware')

const playedGameController = require('../controllers/playedGame')


router.get('/', authenticate.authenticateToken, playedGameController.getPlayedGames);
router.get('/:id', authenticate.authenticateToken, playedGameController.getPlayedGamesById);
router.post('/', authenticate.authenticateToken, playedGameController.createPlayedGame);

module.exports = router;
