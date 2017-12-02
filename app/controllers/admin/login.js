'use strict';
const Admin = require(global.__base + 'app/models/admin');
const utils = require(global.__base + 'app/utils/index');
const bcrypt = require('bcrypt-nodejs');


let login = (req, res) => {
    let keys = ['username', 'password'];
    let notExists = utils.checkKeysNotExists(req.body, keys);
    if (notExists !== -1) {
        return res.status(400).json({
            errCode: -1,
            msg: 'Missing argument ' + keys[notExists]
        });
    }
    let username = req.body.username;
    let password = req.body.password;

    Admin.findOne({ username: username }).exec((err, admin) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        if (!admin) {
            Admin.findOne({ email: username }).exec((err, admin) => {
                if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
                if (!admin) return res.json({ errCode: 404, msg: " Not found" });
                else {
                    if (!bcrypt.compareSync(password, admin.password)) {
                        return res.json({ errCode: 400, msg: 'Password mismatch' });
                    } else {
                        req.session.adminId = admin._id;
                        let resData = { admin: admin };
                        return res.json({ errCode: 200, msg: 'Success', data: resData });
                    }
                }
            });
        } else {
            if (!bcrypt.compareSync(password, admin.password)) {
                return res.json({ errCode: 400, msg: 'Password mismatch' });
            } else {
                req.session.adminId = admin._id;
                let resData = { admin: admin };
                return res.json({ errCode: 200, msg: 'Success', data: resData });
            }
        }
    });

}
module.exports = login;