const express = require("express");
var router = express.Router();

const igdbController = require("../controllers/igdb");

router.get("/credentials", igdbController.getCredentials);
router.get("/:name/:access_token", igdbController.getByName);

module.exports = router;
