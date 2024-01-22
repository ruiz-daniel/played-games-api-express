const express = require('express')
var router = express.Router()
const userController = require('../controllers/user')
var authenticate = require('../authenticateMiddleware')

/* GET users listing. */
router.get('/', authenticate.authenticateToken, userController.getUsers)
router.get('/:id', authenticate.authenticateToken, userController.getUser)
router.post('/login', userController.login)
router.post('/', userController.register)
router.patch('/', authenticate.authenticateToken, userController.update)
router.delete('/:id', authenticate.authenticateToken, userController.delete)

module.exports = router
