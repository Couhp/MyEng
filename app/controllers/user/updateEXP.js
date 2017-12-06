const User = require(global.__base + '/app/models/user.js');
const mongoose = require("mongoose");
const redis = require("redis"),
    client = redis.createClient();
let updateExp = (req, res) => {
    var d = new Date();
    var n = d.getDate();
    let userid = new mongoose.Types.ObjectId(req.session.userId);
    let exp_plus = req.body.exp;
    User.findOne({ _id: userid }).exec((err, user) => {
        if (err) return res.json({ errCode: 500, msg: "Internal error" });
        if (!user) return res.json({ errCode: 404, msg: "User not found" });
        else {
            let exp = Number(user.exp) + Number(exp_plus);
            let info = {
                exp: exp
            }
            User.update({ _id: userid }, info, { upsert: true }).exec((err) => {
                if (err) return res.json({ errCode: 500, msg: "Internal error" });
                else {
                    return res.json({ errCode: 200, msg: "Success" });
                }
            });
            client.exists(userid, function(err, num) {
                if (err) return res.json({ errCode: 500, msg: err });
                if (num === 1) {
                    client.hgetall(userid, function(err, data) {
                        if (Number(n) !== Number(data.date) && (exp + Number(data.tempExp)) >= data.trainExp) {
                            User.findOne({ _id: userid }).exec((err, user) => {
                                let info = {
                                    streak: Number(user.streak) + 1
                                }
                                User.update({ _id: userid }, info, { upsert: true }).exec((err) => {
                                    if (err) console.log(err);
                                });
                            });
                            client.hmset(userid, "trainExp", data.trainExp);
                            client.hmset(userid, "tempExp", 0);
                            client.hmset(userid, "date", n);
                            client.expire(userid, 86400);
                        } else if (Number(n) !== Number(data.date) && (exp + Number(data.tempExp)) < data.trainExp) {
                            client.hmset(userid, "tempExp", (exp + Number(data.tempExp)));
                        } else {
                            console.log("Nothing to update");
                        }
                    });
                } else {
                    console.log("Not trained");
                }
            });
        }
    });


}
module.exports = updateExp;