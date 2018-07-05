const User = require(global.__base + '/app/models/user.js');
const mongoose = require("mongoose");
const redis = require("redis"),
    client = redis.createClient();

let getStreak = (req, res) => {
    let id = req.session.userId;
    client.exists(id, function(err, num) {
        if (err) return res.json({ errCode: 500, msg: err });
        if (num === 1) {
            client.hgetall(id, function(err, data) {
                if (err) return res.json({ errCode: 500, msg: err });
                else {
                    if (Number(new Date().getDate()) === Number(data.date)) {
                        if (err) return res.json({ errCode: 500, msg: err });
                        else {
                            if (err) return res.json({ errCode: 200, msg: "Completed!" });
                        }
                    } else {
                        return res.json({ errCode: 400, msg: "Not Completed!" });
                    }
                }
            })
        } else {
            return res.json({ errCode: 404, msg: "User don't have any streak!" });
        }
    });
}
module.exports = getStreak;