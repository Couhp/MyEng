const User = require(global.__base + '/app/models/user.js');
const mongoose = require('mongoose');
let getInfo = (req, res) => {
    if (req.body.userid != null) {
        let id = new mongoose.Types.ObjectId(req.body.userid);
        User.findOne({ _id: id }).exec((err, user) => {
            if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
            else {
                return res.status(200).json({ errCode: 200, msg: "Success", data: user });
            }
        });
    } else {
        User.findOne({ username: req.body.username }).exec((err, user) => {
            if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
            else {
                return res.status(200).json({ errCode: 200, msg: "Success", data: user });
            }
        });
    }
}
module.exports = getInfo;