const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("user/userhome", {req: req}))

module.exports = router;