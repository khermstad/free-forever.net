"use strict";

var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  return res.render("mycatalog", { email: req.session.email });
});

module.exports = router;