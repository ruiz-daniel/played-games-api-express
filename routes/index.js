var express = require('express');
var router = express.Router();

const playedGameController = require('../controllers/playedGame')

/* GET home page. */
router.get('/', playedGameController.index);

module.exports = router;
