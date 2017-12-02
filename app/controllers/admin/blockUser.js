'use strict';
const Admin = require(global.__base + 'app/models/admin');
const utils = require(global.__base + 'app/utils/index');
const User = require(global.__base + 'app/models/user');
const mongoose = require("mongoose");
let block = (req, res) => {
    let id = new mongoose.Types.ObjectId(req.body.userid);
    let info = {
        isBlock: 1
    }
    User.update({ _id: id }, info, { upsert: true }).exec((err) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        else {
            return res.status(200).json({ errCode: 200, msg: "Success" });
        }
    });

}
module.exports = block;