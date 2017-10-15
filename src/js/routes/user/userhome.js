const express = require("express");
const router = express.Router();
const userhome_controller = require('./../../controllers/user/userhomeController')

router.get("/", userhome_controller.index)

module.exports = router;