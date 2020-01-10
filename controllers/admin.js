let userModel = require('../models/users.js');

let index = async (req, res, next) => {
    res.send({
        msg: '管理员',
        status: 0
    })
};
let getuser = async (req, res, next) => {
    let result = await userModel.getuser();
    if (result) {
        res.send({
            msg: '获取用户信息成功',
            status: 0,
            data: {
                userlist: result
            }
        })
    } else {
        res.send({
            msg: '获取用户信息失败',
            status: 0
        })
    }
};

let removeUser = async (req, res, next) => {
    let {email} = req.body;
    let result = await userModel.removeUser(email);
    if (result) {
        res.send({
            msg: '删除成功',
            status: 0
        })
    } else {
        res.send({
            msg: '删除失败',
            status: -1
        })
    }
};
module.exports = {
    index,
    getuser,
    removeUser
}