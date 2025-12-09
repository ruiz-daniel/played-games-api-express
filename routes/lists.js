var express = require('express')
var router = express.Router()
var authenticate = require('../authenticateMiddleware')

const tierListController = require('../controllers/tierList')


router.get('/', authenticate.authenticateToken, tierListController.getLists)
router.get(
  '/:id',
  authenticate.authenticateToken,
  tierListController.getListById,
)
router.post(
  '/',
  authenticate.authenticateToken,
  tierListController.createList,
)
router.patch(
  '/',
  authenticate.authenticateToken,
  tierListController.updateList,
)
router.delete(
  '/:id',
  authenticate.authenticateToken,
  tierListController.deleteList,
)

module.exports = router
