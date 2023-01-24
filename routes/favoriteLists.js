var express = require('express')
var router = express.Router()
var authenticate = require('../authenticateMiddleware')

const favoriteListController = require('../controllers/favoriteList')
const favoriteListTierController = require('../controllers/favoriteListTier')

router.get('/', authenticate.authenticateToken, favoriteListController.getLists)
router.get(
  '/:id',
  authenticate.authenticateToken,
  favoriteListController.getListById,
)
router.post(
  '/',
  authenticate.authenticateToken,
  favoriteListController.createList,
)
router.patch(
  '/',
  authenticate.authenticateToken,
  favoriteListController.updateList,
)
router.delete(
  '/:id',
  authenticate.authenticateToken,
  favoriteListController.deleteList,
)
router.get(
  '/tier/:id',
  authenticate.authenticateToken,
  favoriteListTierController.getTier,
)
router.patch(
  '/tier',
  authenticate.authenticateToken,
  favoriteListTierController.updateTier,
)
router.delete(
  '/tier/:id',
  authenticate.authenticateToken,
  favoriteListTierController.deleteTier,
)

module.exports = router
