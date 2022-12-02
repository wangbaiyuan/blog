const qiniu = require('qiniu');

var args = process.argv.slice(2);

const accessKey = process.env.QINIU_KEYID;
const secretKey = process.env.QINIU_KEYSECRET;
const privateBucketDomain = process.env.QINIU_BUCKET_DOMAIN;
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const config = new qiniu.conf.Config();
const bucketManager = new qiniu.rs.BucketManager(mac, config);

const deadline = parseInt(Date.now() / 1000) + 300; // Expired after 1 min
const privateDownloadUrl = bucketManager.privateDownloadUrl(privateBucketDomain, args[0], deadline);
console.log(privateDownloadUrl);
