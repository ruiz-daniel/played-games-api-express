const express = require('express')
var router = express.Router()

const completionController = require('../controllers/completion')

router.get('/', completionController.getCompletions)
router.get('/:name', completionController.getCompletionsByName)

module.exports = router