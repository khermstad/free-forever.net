const track = require('./../../models/Track')
const db = require('../../db')

//s3
const s3client = require('./../../s3client/s3client')
const s3_creds = require('../../../../config/aws-config')

// Track schema for Sequelize
const Track =  db.define('track', track.schema, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
})

export const index = (req, res) => getTracksByEmail(req.session.email, req, res)

export const deleteTrack = (req, res) => {
    Track.destroy({
        where : {
            trackid: req.params.trackid
        }
    })
    .then(getTracksByEmail(req.session.email, req, res))
} 


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