const s3 = require('s3');
const s3_creds = require('../../../config/aws-config')

 const client = s3.createClient({
 maxAsyncS3: 5,     // this is the default 
 s3RetryCount: 10,    // this is the default 
 s3RetryDelay: 1000, // this is the default 
 multipartUploadThreshold: 20971520, // this is the default (20 MB) 
 multipartUploadSize: 15728640, // this is the default (15 MB) 
 s3Options: {
   accessKeyId: s3_creds.aws_access_key_id,
   secretAccessKey: s3_creds.aws_secret_access_key,
   // any other options are passed to new AWS.S3() 
   // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property 
 },
});

const params = {
    localFile: "README.md",
   
    s3Params: {
      Bucket: s3_creds.s3_bucket,
      Key: "readme.md",
      // other options supported by putObject, except Body and ContentLength. 
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property 
    },
  };

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