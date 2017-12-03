const User = require(global.__base + '/app/models/user.js');
const mongoose = require('mongoose');
let Info = (req, res) => {
    let id = new mongoose.Types.ObjectId(req.session.userId);
    User.findOne({ _id: id }).exec((err, user) => {
        if (err) return res.json({ errCode: 500, msg: "Internal error" });
        else {
            return res.json({ errCode: 200, msg: "Success", data: user });
        }
    });
}
module.exports = Info;
