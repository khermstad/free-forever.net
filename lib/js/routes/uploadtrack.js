"use strict";

var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  return res.render("uploadtrack", { email: req.session.email });
});

module.exports = router;