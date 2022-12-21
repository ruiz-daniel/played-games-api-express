const express = require('express')
var router = express.Router()

const platformController = require('../controllers/platform')

router.get('/', platformController.getPlatforms)
router.get('/:name', platformController.getPlatformsByName)

module.exports = router