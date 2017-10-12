"use strict";

var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  return res.render("artists");
});

module.exports = router;