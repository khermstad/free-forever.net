// catalog controller
const user = require('./../models/User')
const db = require('./../db')

// User model
const User = db.define('user', user.schema, {
    timestamps: false
})

export const index = (req, res) => {
    getAllArtists(req, res)
}

const getAllArtists = (req, res) => {
    return User.findAll().then(artists => {
        res.render("artists", {
            req: req,
            artists: artists
        })
    })
}