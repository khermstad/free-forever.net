const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("mycatalog", {email: req.session.email}))

module.exports = router;