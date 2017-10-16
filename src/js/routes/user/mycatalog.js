const express = require("express");
const router = express.Router();
const mycatalog_controller = require('./../../controllers/user/mycatalogController')

router.get("/", mycatalog_controller.index)
router.get("/:trackid", (req, res) => {
    res.send(req.session.email + " " + req.params)
})

module.exports = router;