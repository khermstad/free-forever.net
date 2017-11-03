// catalog controller
const user = require('./../models/Track')
const db = require('./../db')

// User model
const Track = db.define('track', user.schema, {
    timestamps: false
})

export const index = (req, res) => {
    res.send("rendering track")
}