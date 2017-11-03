const express = require("express");
const router = express.Router();
const track_controller = require('./../controllers/trackController')

router.get("/", track_controller.index);

module.exports = router;