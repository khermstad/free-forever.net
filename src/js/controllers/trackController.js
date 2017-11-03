// catalog controller
const user = require('./../models/Track')
const db = require('./../db')

// track schema
const Track = db.define('track', track.schema, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
})



export const index = (req, res) => {
    res.send("rendering track")
}