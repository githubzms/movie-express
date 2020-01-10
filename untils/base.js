const crypto = require('crypto');
const captcha = require('trek-captcha');
let setCrypto = (info) => {
    return crypto.createHmac('sha256', '$@$$#$#$$')
        .update(info)
        .digest('hex');
}
let codeImg = (req, res) => {
    return captcha().then((info) => {
        req.session.codeImg = info.token;
        return info.buffer;
    }).catch(() => {
        return false;
    })
}
module.exports = {
    setCrypto,
    codeImg
}