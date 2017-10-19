const express = require("express");
const router = express.Router();
const admin_controller = require('./../controllers/adminController')

router.get("/", admin_controller.index);
router.post("/", admin_controller.login); 

router.post("/approve/:trackid", admin_controller.setTrackApproved)
router.post("/pending/:trackid", admin_controller.setTrackPending)
router.post("/reject/:trackid", admin_controller.setTrackRejected)

module.exports = router;