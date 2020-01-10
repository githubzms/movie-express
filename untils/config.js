var mongoose = require('mongoose');
let nodemailer = require('nodemailer')
var Mongoose = {
    url: 'mongodb://localhost/movie',
    connect() {
        mongoose.connect(this.url, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
            if (err) {
                console.log('数据库连接失败');
                return;
            }
            console.log('数据库链接成功')
        })
    }
}
// 链接邮箱
let Email = {
    config: {
        host: "smtp.qq.com",
        port: 587,
        auth: {
            user: '943844881@qq.com', // generated ethereal user
            pass: 'bqtukjteyjiobbjd' // generated ethereal password
        }
    },
    get transporter() {
        return nodemailer.createTransport(this.config)
    },
    get code() {
        console.log('dddd')
        return Math.random().toString().substring(2, 6)
    },
    get time() {
        return Date.now()
    }
};
let head={
    baseUrl:'http://localhost:3000/images/'
};
module.exports = {
    Mongoose,
    Email,
    head
}