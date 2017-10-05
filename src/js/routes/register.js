const express = require("express")
const router = express.Router()

router.get("/", (req, res) => res.render("register"))

router.post("/", (req, res) => {
    const newUser = req.body;
    res.send(newUser);
})

module.exports = router;