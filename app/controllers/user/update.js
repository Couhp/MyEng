const User = require(global.__base + '/app/models/user.js');
const mongoose = require('mongoose');
let updateInfo = (req, res) => {
    let id = new mongoose.Types.ObjectId(req.session.userId);
    let info = {
        displayName: req.body.displayName,
        email: req.body.email,
        job: req.body.job,
        livingIn: req.body.livingIn
    }
    User.update({ _id: id }, info, { upsert: true }).exec((err) => {
        if (err) return res.json({ errCode: 500, msg: "Internal error" });
        else {
            return res.json({ errCode: 200, msg: "Update success!" });
        }
    })
}
module.exports = updateInfo;