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
export const index = (req, res) => res.render('admin/login', {req: req})

export const login = (req, res) => {
    const {admin, adminpass} = req.body
    isValidAdmin(admin, adminpass).then(isValid => {
        if(isValid) {
            console.log(req.body)
            return getAllApprovedTracks(req, res)
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

const getAllApprovedTracks = (req, res) => {
    return Track.findAll()
    .then(tracks => {
        for(let track of tracks){
            track.s3link = `https://s3.amazonaws.com/ffm-datastore/${track.dataValues.s3key}`
        }
        console.log(tracks)
        res.render("admin/admin", {req: req, tracks: tracks})
    })
}