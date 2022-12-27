var express = require('express');
var router = express.Router();

const playedGameController = require('../controllers/playedGame')


router.get('/', playedGameController.getPlayedGames);
router.get('/:id', playedGameController.getPlayedGamesById);
router.post('/', playedGameController.createPlayedGame);

module.exports = router;
