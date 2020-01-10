let { Email,head } = require('../untils/config.js');
let { setCrypto,codeImg } = require('../untils/base.js');
let userModel = require('../models/users.js');
let fs=require('fs');
let url=require('url')
var login = async (req, res, next) => {
    let { username, password,codeImg } = req.body;
    let result = await userModel.findLogin({
        username,
        password:setCrypto(password)
    })
    if(codeImg!==req.session.codeImg){
        res.send({
            msg: '验证码错误',
            status: -1
        })
        return;
    }
    if (result) {
        req.session.username = username;
        req.session.isAdmin = result.isAdmin;
        req.session.userHead = result.userHead;
        res.send({
            msg: '登录成功',
            status: 0
        })
    } else {
        res.send({
            msg: '登录失败',
            status: 401
        })
    }
};
var register = async (req, res, next) => {
    let { username, password, email, code } = req.body;
    if (email !== req.session.email || code !== req.session.code) {
        res.send({
            msg: '验证码错误',
            status: -1
        })
        return;
    }
    if ((Email.time - req.session.time) / 1000 > 60) {
        res.send({
            msg: '验证码已过期',
            status: -3
        })
        return;
    }
    let result = await userModel.save({
        username,
        password:setCrypto(password),
        email
    });
    if (result) {
        res.send({
            msg: '注册成功',
            status: 0
        })
    } else {
        res.send({
            msg: '注册失败',
            status: -1
        })
    }
};
var code = async (req, res, next) => {
    let email = req.query.email;
    let code = Email.code;
    req.session.email = email;
    req.session.code = code;
    req.session.time = Email.time
    let mailOptions = {
        from: 'movie 943844881@qq.com', // sender address
        to: email,
        subject: "来自movie最深切的问候", // Subject line
        text: `本次验证码:${code}`, // plain text body
    }
    Email.transporter.sendMail(mailOptions, (err) => {
        if (err) {
            res.send({
                msg: '验证码发送失败',
                status: -1
            })
        } else {
            res.send({
                msg: '验证码发送成功',
                status: 0
            })

        };
    })
};
var logout = async (req, res, next) => {
    req.session.username = '';
    res.send({
        msg: '退出成功',
        status: 0
    })
};
var getuser = async (req, res, next) => {
    if (req.session.username) {
        res.send({
            msg: '获取用户信息成功',
            status: 0,
            data: {
                username: req.session.username,
                isAdmin: req.session.isAdmin,
                userHead:req.session.userHead
            }
        })
    } else {
        res.send({
            msg: '获取用户信息失败',
            status: -1
        })
    }
};
var findpsd = async (req, res, next) => {
    let { email, password, code } = req.body;
    if ((Email.time - req.session.time) / 1000 > 60) {
        res.send({
            msg: '验证码已过期',
            status: -3
        })
        return;
    }
    if (email === req.session.email && code === req.session.code) {
        let result = await userModel.updatePassword(email, setCrypto(password));
        if (result) {
            res.send({
                msg: '修改密码成功',
                status: 0
            })
        } else {
            res.send({
                msg: '修改密码失败',
                status: -1
            })
        }
    } else {
        res.send({
            msg: '邮箱或者邮箱验证码错误',
            status: -1
        })
    }
};
let getcodeImg=async (req,res,next)=>{
    let result=await codeImg(req,res);
    console.log(result)
    if(result){
        res.send(result)
    }
};
// 上传头像
let uploadImg=async (req,res,next)=>{
   fs.rename('public/images/'+req.file.filename,'public/images/'+req.session.username+'.jpg',err=>{
       console.log('重命名成功')
   })
   let result=await userModel.updateImg(req.session.username,url.resolve(head.baseUrl,req.session.username+".jpg"));
   if(result){
       res.send({
           msg:'更新成功',
           status:0,
           data:{
               userHead:url.resolve(head.baseUrl,req.session.username+".jpg")
           }
       })
   }else{
    res.send({
        msg:'更新失败',
        status:-1
    })
   }

};
module.exports = {
    login, register, code, logout, getuser, findpsd,getcodeImg,uploadImg
}