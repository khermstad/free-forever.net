const track = require('./../models/Track')
const admin = require('./../models/Admin')
const db = require("./../db")
//s3
const s3client = require('./../s3client/s3client')
const s3_creds = require('./../../../config/aws-config')



const Admin = db.define('admin', admin.schema, {
    timestamps: false
})

// track schema
const Track = db.define('track', track.schema, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
})

// controller
export const index = (req, res) => {
    if (!req.session.isValid){
        res.render('admin/login', {req: req})
    }
    else{
        return getAllTracks(req, res)
        
    }
}
export const login = (req, res) => {
    const {admin, adminpass} = req.body
    isValidAdmin(admin, adminpass).then(isValid => {
        if(isValid) {
            req.session.isValid = true;
            console.log(req.body)
            return getAllTracks(req, res)
        }
        else{
            return res.render('admin/login', {admin_login_error_message: "Invalid Admin"})
        }
    })
}

export const flushRejectedTracks = (req, res) => {
   
    return Track.findAll({
        where: {
            rejected: true
        }
    })
    .then(tracks => {
        let rejectedTrackKeys = []

        for(let track of tracks){
                rejectedTrackKeys.push({"Key": track.dataValues.s3key})
        }
        
        var params = {
            Bucket: "ffm-datastore", 
            Delete: {
             Objects: rejectedTrackKeys,
            
            
                //     {
            //    Key: "objectkey1"
            //   }, 
            //     {
            //    Key: "objectkey2"
            //   }
            //  ], 
             Quiet: false
            }
           };

        s3client.deleteObjects(params, (err, data) =>{
            if (err) console.log(err, err.stack)
                else {
                 
                }
        })
        Track.destroy({
            where: {
                rejected: true
            }
        })
        res.render('admin/flushed', {rejectedTrackKeys: rejectedTrackKeys})
        
    })
}

export const setTrackApproved = (req, res) => {
    return Track.findOne({
        where: {
            trackid: req.params.trackid
        }
    })
    .then(track => {
        // Check if record exists in db
        if (track){
          track.updateAttributes({
            approved: true,
            rejected: false
          })
          .then(() => {
              res.redirect('/admin')
          })
        }
      })
}

export const setTrackPending = (req, res)  => {
    return Track.findOne({
        where: {
            trackid: req.params.trackid
        }
    })
    .then(track => {
        // Check if record exists in db
        if (track){
          track.updateAttributes({
            approved: false,
            rejected: false
          })
          .then(() => {
              res.redirect('/admin')
          })
        }
      })
}
export const setTrackRejected = (req, res)  => {
    return Track.findOne({
        where: {
            trackid: req.params.trackid
        }
    })
    .then(track => {
        // Check if record exists in db
        if (track){
          track.updateAttributes({
            approved: false,
            rejected: true 
          })
          .then(() => {
              res.redirect('/admin')
          })
        }
      })
}


const isValidAdmin = (admin, adminpass) => {
    return Admin.count({
            where: {
                email: admin,
                password: adminpass 
            }
        })
        .then(count => {
            if (count === 1) {
                return true;
            }
            return false;
        })
}

const getAllTracks = (req, res) => {
    return Track.findAll()
    .then(tracks => {
        for(let track of tracks){
            track.s3link = `https://s3.amazonaws.com/ffm-datastore/${track.dataValues.s3key}`
        }
        
        let approvedTracks = []
        let pendingTracks = []
        let rejectedTracks = []

        for (let track of tracks){
            if (track.dataValues.approved === true) {
                approvedTracks.push(track)
            }
            else if (track.dataValues.approved === false && track.dataValues.rejected === false){
                pendingTracks.push(track)
            }
            else{
                rejectedTracks.push(track)
            }
            
        }
        
        res.render("admin/admin", {req: req, approvedTracks: approvedTracks,
                        pendingTracks: pendingTracks, rejectedTracks: rejectedTracks
        })
    })
}