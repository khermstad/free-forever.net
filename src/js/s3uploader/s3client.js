const AWS = require('aws-sdk')
const zlib = require('zlib')
const fs = require('fs')
const s3Stream = require('s3-upload-stream')(new AWS.S3())
const s3_creds = require('../../../config/aws-config')

AWS.config.update({accessKeyId: s3_creds.aws_access_key_id, secretAccessKey: s3_creds.aws_secret_access_key})

var read = fs.createReadStream('./../app.js');
var compress = zlib.createGzip();
var upload = s3Stream.upload({
  "Bucket": "khermstad-s3uploader-testbucket",
  "Key": "key-name"
});
 
// Optional configuration 
upload.maxPartSize(20971520); // 20 MB 
upload.concurrentParts(5);
 
// Handle errors. 
upload.on('error', function (error) {
  console.log(error);
});
 
/* Handle progress. Example details object:
   { ETag: '"f9ef956c83756a80ad62f54ae5e7d34b"',
     PartNumber: 5,
     receivedSize: 29671068,
     uploadedSize: 29671068 }
*/
upload.on('part', function (details) {
  console.log(details);
});
 
/* Handle upload completion. Example details object:
   { Location: 'https://bucketName.s3.amazonaws.com/filename.ext',
     Bucket: 'bucketName',
     Key: 'filename.ext',
     ETag: '"bf2acbedf84207d696c8da7dbb205b9f-5"' }
*/
upload.on('uploaded', function (details) {
  console.log(details);
});
 
// Pipe the incoming filestream through compression, and up to S3. 
read.pipe(compress).pipe(upload);