"use strict";

var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  return res.render("user/mycatalog", { req: req });
});

module.exports = router;