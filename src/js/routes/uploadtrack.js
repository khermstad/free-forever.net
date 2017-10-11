const express = require("express");
const router = express.Router();
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

router.get("/", (req, res) => res.render("user/uploadtrack", {req: req}))

router.post("/", upload.single('file'))

module.exports = router;