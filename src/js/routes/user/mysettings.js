const express = require("express");
const router = express.Router();
const mysettings_controller = require('./../../controllers/user/mysettingsController')

router.get("/", mysettings_controller.index)

module.exports = router;