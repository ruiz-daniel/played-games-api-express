var express = require('express')
var router = express.Router()
var authenticate = require('../authenticateMiddleware')

const singleListController = require('../controllers/singleList')

router.get(
  '/',
  authenticate.authenticateToken,
  singleListController.getTier,
)
router.get(
  '/:id',
  authenticate.authenticateToken,
  singleListController.getTierById,
)
router.post(
  '/',
  authenticate.authenticateToken,
  singleListController.createTier
)
router.patch(
  '/',
  authenticate.authenticateToken,
  singleListController.updateTier,
)
router.delete(
  '/:id',
  authenticate.authenticateToken,
  singleListController.deleteTier,
)

module.exports = router