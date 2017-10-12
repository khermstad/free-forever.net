const s3 = require('s3');
const s3_creds = require('../../../config/aws-config')

 const s3client = s3.createClient({
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



//uploadFile(buildParams("README.md", s3_creds.s3_bucket, "readme3.md"))

module.exports = s3client;