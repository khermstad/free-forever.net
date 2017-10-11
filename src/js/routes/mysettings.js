const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("mysettings", {req: req}))

module.exports = router;