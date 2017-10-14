const express = require("express");
const router = express.Router();
const uploadtrack_controller = require('./../../controllers/user/uploadtrackController')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})

router.get("/", uploadtrack_controller.index)
router.post("/",  upload.single('file'), uploadtrack_controller.uploadtrack_post)

module.exports = router;