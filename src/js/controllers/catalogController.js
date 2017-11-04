//  /catalog controller
const track = require("./../models/Track")
const db = require('../db')

// track schema
const Track = db.define('track', track.schema, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
})

const getAllApprovedTracks = (req, res) => {
    return Track.findAll({
        where: {
            approved: true
        }
    })
        .then(tracks => {
            for (let track of tracks) {
                track.s3link = `https://s3.amazonaws.com/ffm-datastore/${track.dataValues.s3key}`
            }
            res.render("catalog", {req: req, tracks: tracks})
        })
}

export const index = (req, res) => getAllApprovedTracks(req, res);
