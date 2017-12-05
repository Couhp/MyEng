const User = require(global.__base + '/app/models/user.js');
const mongoose = require("mongoose");
let updateLevel = (req, res) => {
    let userid = new mongoose.Types.ObjectId(req.session.userId);
    let lvl = Number(req.body.level)
    User.findOne({ _id: userid }).exec((err, user) => {
        if (err) return res.json({ errCode: 500, msg: "Internal error" });
        if (!user) return res.json({ errCode: 404, msg: "User not found" });
        else {
            let info = {
                current_level: lvl
            }
            User.update({ _id: id }, info, { upsert: true }).exec((err) => {
                if (err) return res.json({ errCode: 500, msg: "Internal error" });
                else return res.json({ errCode: 200, msg: "Success" });
            });
        }
    });
}
module.exports = updateLevel;