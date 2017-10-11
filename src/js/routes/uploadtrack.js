const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("user/uploadtrack", {req: req}))

module.exports = router;