const User = require(global.__base + '/app/models/user.js');
const mongoose = require('mongoose');
const redis = require('redis'),
    client = redis.createClient();
let Info = (req, res) => {
    let id = new mongoose.Types.ObjectId(req.session.userId);
    User.findOne({ _id: id }).exec((err, user) => {
        if (err) return res.json({ errCode: 500, msg: "Internal error" });
        else {
            client.exists(req.session.userId.toString(), function(err, num) {
                if (num === 1) {
                    client.hgetall(req.session.userId.toString(), function(err, data) {
                        if (err) console.log(err);
                        let train = data.trainExp;
                        let resData = { user: user };
                        return res.json({ errCode: 200, msg: 'Success', data: user, train: train });
                    })
                } else {
                    user["streak"] = 0;
                    User.update({ _id: id }, { streak: 0 }, { upsert: true }).exec((err) => {
                        if (err) return res.json({ errCode: 500, msg: err });
                    });
                    return res.json({ errCode: 200, train: 0, msg: 'Success', data: user });
                }
            });
        }
    });
}
module.exports = Info;