const User = require(global.__base + '/app/models/user.js');
const mongoose = require("mongoose");
let updateExp = (req, res) => {
    let userid = new mongoose.Types.ObjectId(req.session.userId);
    let topicid = new mongoose.Types.ObjectId(req.body.topicid);
    let exp_plus = req.body.exp;
    User.findOne({ _id: userid }).exec((err, user) => {
        if (err) return res.json({ errCode: 500, msg: "Internal error" });
        if (!user) return res.json({ errCode: 404, msg: "User not found" });
        else {
            let arr = user.topic;
            arr.push(topicid);
            let exp = Number(user.exp) + Number(exp_plus);
            let info = {
                topic: arr,
                exp: exp
            }
            User.update({ _id: userid }, info, { upsert: true }).exec((err) => {
                if (err) return res.json({ errCode: 500, msg: "Internal error" });
                else {
                    return res.json({ errCode: 200, msg: "Success" });
                }
            });
        }
    });
}
module.exports = updateExp;