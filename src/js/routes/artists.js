const express = require("express");
const router = express.Router();
const artists_controller = require('./../controllers/artistsController')

router.get("/", artists_controller.index);

module.exports = router;