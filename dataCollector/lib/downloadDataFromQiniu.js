const qiniu = require('qiniu');
const axios = require('axios');

const accessKey = process.env.QINIU_KEYID;
const secretKey = process.env.QINIU_KEYSECRET;
const privateBucketDomain = process.env.QINIU_BUCKET_DOMAIN;

const downloadFile = async (file) => {
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const config = new qiniu.conf.Config();
    const bucketManager = new qiniu.rs.BucketManager(mac, config);
    const deadline = parseInt(Date.now() / 1000) + 300; // Expired after 1 min
    const privateDownloadUrl = bucketManager.privateDownloadUrl(privateBucketDomain, file, deadline);
    return axios.get(privateDownloadUrl, {
        headers: {
            Referer: 'https://wangbaiyuan.cn'
        }
    }).then((res) => {
        console.log(res.data)
    })
}

Promise.all([
    // downloadFile('wp-comments.json'),
    downloadFile('github-comments.json'),
]).then()
