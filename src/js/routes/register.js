// register router
const express = require("express");
const router = express.Router();
const register_controller = require('./../controllers/registerController')

//routes
router.get('/', register_controller.index)
router.post('/', register_controller.registerUser)

module.exports = router;