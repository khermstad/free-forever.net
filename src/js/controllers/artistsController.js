// catalog controller
const user = require('./../models/User')
const db = require('./../db')
const track = require("./../models/Track")

// User model
const User = db.define('user', user.schema, {
    timestamps: false
})

// track schema
const Track = db.define('track', track.schema, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
})

export const index = (req, res) => {
    getAllArtists(req, res)
}

export const getArtist = (req, res) => {

    return Track.findAll({
        where: {
            displayedname: req.params.displayedname
        }
    })
        .then(tracks => {

            res.render('artist', {tracks: tracks, artist: req.params.displayedname})
        })


}

const getAllArtists = (req, res) => {
    return User.findAll().then(artists => {
        res.render("artists", {
            req: req,
            artists: artists
        })
    })
}