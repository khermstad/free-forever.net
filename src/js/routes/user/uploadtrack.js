const express = require("express");
const router = express.Router();

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})

const track = require('./../../models/Track')
const db = require('../../db')

const s3client = require('./../../s3uploader/s3client')
const s3_creds = require('../../../../config/aws-config')

// Track schema for Sequelize
const Track = db.define('track', track.schema, {
    timestamps: true,
    createdAt: 'created'
})

// inserts Track info into postgres DB using Sequelize ORM
const createTrackInDB = (email, s3key, bucket, title, description, timestamp) => {
    Track.create({
        email: email,
        s3key: s3key,
        bucket: bucket,
        title: title,
        description: description,
        timestamp: timestamp
    })
}

// helper method to bulid Param method for uploadFile method
const buildParams = (file, bucket, key) => {
    var params = {
        localFile: "uploads/" + file,

        s3Params: {
            Bucket: bucket,
            Key: key,
        }
    }
    return params;
}

const uploadFile = (params, client, req, res) => {
 const uploader = client.uploadFile(params);
  uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack);
    res.render('user/uploadtrack', {upload_error_message: "File upload failed."})
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressMd5Amount,
              uploader.progressAmount, uploader.progressTotal);
    console.log(Math.round((uploader.progressAmount/uploader.progressTotal)*100))
  });
  uploader.on('end', function() {


    createTrackInDB(req.session.email, params.s3Params.Key, params.s3Params.Bucket, req.body.title, req.body.description)
    console.log("done uploading");
    res.render('user/uploadtrack', {upload_success_message: "File upload complete."})
  }); 
}

router.get("/", (req, res) => res.render("user/uploadtrack", {req: req}))


router.post("/", upload.single('file'), (req, res) => {
    const trackKey = `users/${req.session.email}/tracks/${req.body.title}.mp3`
    const uploadParams = buildParams(req.file.originalname, s3_creds.s3_bucket, trackKey)
    uploadFile(uploadParams, s3client, req, res)
})

module.exports = router;