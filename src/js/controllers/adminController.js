const track = require('./../models/Track')
const admin = require('./../models/Admin')
const db = require("./../db")

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