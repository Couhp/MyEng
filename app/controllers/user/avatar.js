const User = require(global.__base + '/app/models/user.js');
const mongoose = require("mongoose");
let avatar = (req, res) => {
    if (req.file != null && req.file != undefined && req.file.mimetype.indexOf("image") === -1) {
        return res.status(413).json({ errCode: 413, msg: "Unsupported media type" });
    } else {
        let info = {
            avatar: req.file.path
        }
        let userid = new mongoose.Types.ObjectId(req.session.userId);
        User.update({ _id: userid }, info, { upsert: true }).exec((err) => {
            if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
            else return res.status(200).json({ errCode: 200, msg: "Success" });
        });
    }
}
module.exports = avatar