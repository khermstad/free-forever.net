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

const s3client = require('./../s3uploader/s3client')
const s3_creds = require('../../../config/aws-config')

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

const uploadFile = (params, client) => {
 const uploader = client.uploadFile(params);
  uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack);
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressMd5Amount,
              uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    console.log("done uploading");
  }); 
}

router.get("/", (req, res) => res.render("user/uploadtrack", {req: req}))


router.post("/", upload.single('file'), (req, res) => {
    console.log(req.file)
    console.log('testing file upload')
    uploadFile(buildParams(req.file.originalname, s3_creds.s3_bucket, 
    "users/" + req.session.email + "/tracks/" + req.file.originalname), s3client)
})

module.exports = router;