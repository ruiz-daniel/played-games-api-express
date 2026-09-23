const express = require("express");
var router = express.Router();

const igdbController = require("../controllers/igdb");

router.get("/credentials", igdbController.getCredentials);
router.get("/:name", igdbController.getByName);
router.get("/cover/:gameId", igdbController.getCoverImg);
router.get("/artworks/:gameId", igdbController.getArtworks);

module.exports = router;
