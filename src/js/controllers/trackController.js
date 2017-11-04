// catalog controller
const track = require('./../models/Track')
const user = require('./../models/User')
const db = require('./../db')

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
    res.send("rendering track")
}

export const getTrack = (req, res) => {

    let track_data;

    Track.find({
        where: {
            trackid: req.params.track_id
        }
    })
        .then(track => {
           track_data = track;

           User.find({
               where: {
                   email: track.email
               }
           })
               .then(user => {
                   res.render('track', {user: user, track: track_data})
               })

        })

}