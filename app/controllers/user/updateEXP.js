const User = require(global.__base + '/app/models/user.js');
const mongoose = require("mongoose");
let updateExp = (req, res) => {
    let userid = new mongoose.Types.ObjectId(req.body.userid);
    let topicid = new mongoose.Types.ObjectId(req.body.topicid);
    let exp_plus = req.body.exp;
    User.findOne({ _id: userid }).exec((err, user) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        if (!user) return res.status(404).json({ errCode: 404, msg: "User not found" });
        else {
            let arr = user.topic;
            arr.push(topicid);
            let lvl = Number(user.current_level);
            let exp = Number(user.exp) + Number(exp_plus);
            let threshold = lvl * 50 + (lvl + 1) * 100;
            if (exp >= threshold) {
                let info = {
                    current_level: lvl + 1,
                    exp: exp,
                    topic: arr
                }
                User.update({ _id: userid }, info, { upsert: true }).exec((err) => {
                    if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
                    else {
                        return res.status(200).json({ errCode: 200, msg: "Success" });
                    }
                });
            } else {
                let info = {
                    current_level: lvl,
                    exp: exp,
                    topic: arr
                }
                User.update({ _id: userid }, info, { upsert: true }).exec((err) => {
                    if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
                    else {
                        return res.status(200).json({ errCode: 200, msg: "Success" });
                    }
                });
            }
        }
    });
}
module.exports = updateExp;