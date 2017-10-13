const express = require("express");
const router = express.Router();
const track = require('./../../models/Track')
const db = require('../../db')

router.get("/", (req, res) => {
    getTracksByEmail(req.session.email, req, res)
})

const Track = db.define('track', track.schema, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
})

const getTracksByEmail = (email, req, res) => {
    return Track.findAll({
        where: {
            email: email
        }
    })
    .then(tracks => {
        // console.log(tracks[0].dataValues.s3key)
       for(let track of tracks){
           track.s3link = `https://s3.amazonaws.com/ffm-datastore/${track.dataValues.s3key}`
       }
       res.render("user/mycatalog", {req: req, tracks: tracks})
    })
}


module.exports = router;