'use strict';
const Admin = require(global.__base + 'app/models/admin');
const utils = require(global.__base + 'app/utils/index');
const User = require(global.__base + 'app/models/user');

let getAllUser = (req, res) => {

    User.find().exec((err, user) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        else {
            return res.status(200).json({ errCode: 200, msg: "Success", data: user });
        }
    });

}
module.exports = getAllUser;