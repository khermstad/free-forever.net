"use strict";

var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  return res.render("login");
});

module.exports = router;