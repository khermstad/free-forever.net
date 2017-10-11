const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("uploadtrack", {req: req}))

module.exports = router;