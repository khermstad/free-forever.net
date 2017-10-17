const express = require("express");
const router = express.Router();
const mycatalog_controller = require('./../../controllers/user/mycatalogController')

router.get("/", mycatalog_controller.index)
router.get("/delete/:trackid", mycatalog_controller.deleteTrack) 

module.exports = router;