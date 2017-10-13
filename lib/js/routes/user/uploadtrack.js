'use strict';

var express = require("express");
var router = express.Router();
var fs = require('fs');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function filename(req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

var track = require('./../../models/Track');
var db = require('../../db');

var s3client = require('./../../s3uploader/s3client');
var s3_creds = require('../../../../config/aws-config');

// Track schema for Sequelize
var Track = db.define('track', track.schema, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
});

// inserts Track info into postgres DB using Sequelize ORM
var createTrackInDB = function createTrackInDB(email, s3key, bucket, title, description) {
    Track.create({
        email: email,
        s3key: s3key,
        bucket: bucket,
        title: title,
        description: description
    });
};

// helper method to bulid Param method for uploadFile method
var buildParams = function buildParams(file, bucket, key) {
    var params = {
        localFile: "uploads/" + file,

        s3Params: {
            Bucket: bucket,
            Key: key
        }
    };
    return params;
};

var uploadFile = function uploadFile(params, client, req, res) {
    var uploader = client.uploadFile(params);
    uploader.on('error', function (err) {
        console.error("unable to upload:", err.stack);
        res.render('user/uploadtrack', { upload_error_message: "File upload failed." });
    });
    uploader.on('progress', function () {
        console.log("progress", uploader.progressMd5Amount, uploader.progressAmount, uploader.progressTotal);
        console.log(Math.round(uploader.progressAmount / uploader.progressTotal * 100));
    });
    uploader.on('end', function () {

        createTrackInDB(req.session.email, params.s3Params.Key, params.s3Params.Bucket, req.body.title, req.body.description);
        console.log("done uploading");
        fs.unlink("./uploads/" + req.file.originalname);
        res.render('user/uploadtrack', { upload_success_message: "File upload complete." });
    });
};

router.get("/", function (req, res) {
    return res.render("user/uploadtrack", { req: req });
});

router.post("/", upload.single('file'), function (req, res) {
    var trackKey = 'users/' + req.session.email + '/tracks/' + req.body.title + '.mp3';
    var uploadParams = buildParams(req.file.originalname, s3_creds.s3_bucket, trackKey);
    uploadFile(uploadParams, s3client, req, res);
});

module.exports = router;