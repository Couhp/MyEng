const User = require(global.__base + '/app/models/user.js');
const utils = require(global.__base + 'app/utils/index');
const bcrypt = require('bcrypt-nodejs');
const redis = require('redis'),
    client = redis.createClient();

let login = (req, res) => {
    console.log(req.body);
    // Check key not exists
    let keys = ['username', 'password'];
    let notExists = utils.checkKeysNotExists(req.body, keys);
    if (notExists !== -1) {
        return res.json({
            errCode: -1,
            msg: 'Missing argument ' + keys[notExists]
        });
    }
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({ username: username }).exec((err, user) => {
        if (err) return res.json({ errCode: 500, msg: 'Internal error' });
        if (!user) {
            User.findOne({ email: username }).exec((err, user) => {
                if (err) return res.json({ errCode: 500, msg: 'Internal error' });
                if (!user) {
                    return res.json({ errCode: 404, msg: 'User not found' });
                } else {
                    if (user.isBlock === 1) return res.json({ errCode: 400, msg: "User was blocked, please contact admin if you need any further information" });
                    else if (!bcrypt.compareSync(password, user.password)) {
                        return res.json({ errCode: 400, msg: 'Password mismatch' });
                    } else {
                        req.session.userId = user._id;
                        client.exists(req.session.userId, function(err, num) {
                            if (num === 1) {
                                client.hgetall(req.session.userId, function(err, data) {
                                    if (err) console.log(err);
                                    let train = data.trainExp;
                                    return res.json({ errCode: 200, train: train, msg: 'Success', data: user });
                                })
                            } else {
                                user.streak = 0;
                                User.update({ _id: user._id }, { streak: 0 }, { upsert: true }).exec((err) => {
                                    if (err) return res.json({ errCode: 500, msg: err });
                                });
                                return res.json({ errCode: 200, train: 0, msg: 'Success', data: user });
                            }
                        });
                    }
                }
            });
        }
        if (user) {
            if (user.isBlock === 1) return res.json({ errCode: 400, msg: "User was blocked, please contact admin if you need any further information" });
            else if (!bcrypt.compareSync(password, user.password)) {
                return res.json({ errCode: 400, msg: 'Password mismatch' });
            } else {
                req.session.userId = user._id;
                client.exists(req.session.userId.toString(), function(err, num) {
                    if (num === 1) {
                        client.hgetall(req.session.userId.toString(), function(err, data) {
                            console.log(data);
                            if (err) console.log(err);
                            let train = data.trainExp;
                            return res.json({ errCode: 200, train: train, msg: 'Success', data: user });
                        })
                    } else {
                        user["streak"] = 0;
                        User.update({ _id: user._id }, { streak: 0 }, { upsert: true }).exec((err) => {
                            if (err) return res.json({ errCode: 500, msg: err });
                        });
                        return res.json({ errCode: 200, train: 0, msg: 'Success', data: user });
                    }
                });
            }
        }

    });
}
module.exports = login;