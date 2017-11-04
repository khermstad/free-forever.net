const express = require("express");
const router = express.Router();
const artists_controller = require('./../controllers/artistsController')

router.get("/", artists_controller.index);
router.get("/:displayedname", artists_controller.getArtist)

module.exports = router;