var express = require('express');
var router = express.Router();
var authenticate = require('../authenticateMiddleware')

const playedGameController = require('../controllers/playedGame')


router.get('/', authenticate.authenticateToken, playedGameController.getPlayedGames);
router.get('/game/:id', authenticate.authenticateToken, playedGameController.getPlayedGamesById);
router.get('/playing', authenticate.authenticateToken, playedGameController.getPlayingGames);
router.get('/user/:userid/:page', authenticate.authenticateToken, playedGameController.getPlayedGamesByUser);
router.post('/', authenticate.authenticateToken, playedGameController.createPlayedGame);
router.patch('/', authenticate.authenticateToken, playedGameController.updatePlayedGame);
router.delete('/:id', authenticate.authenticateToken, playedGameController.deletePlayedGame);

module.exports = router;
