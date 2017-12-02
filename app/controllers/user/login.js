const User = require(global.__base + '/app/models/user.js');
const utils = require(global.__base + 'app/utils/index');
const bcrypt = require('bcrypt-nodejs');

let login = (req, res) => {
    console.log(req.body);
    // Check key not exists
    let keys = ['username', 'password'];
    let notExists = utils.checkKeysNotExists(req.body, keys);
    if (notExists !== -1) {
        return res.status(400).json({
            errCode: -1,
            msg: 'Missing argument ' + keys[notExists]
        });
    }
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({ username: username }).exec((err, user) => {
        if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        if (!user) {
            User.findOne({ email: username }).exec((err, user) => {
                if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                if (!user) {
                    return res.status(404).json({ errCode: 404, msg: 'User not found' });
                } else {
                    if (user.isBlock === 1) return res.status(400).json({ errCode: 400, msg: "User was blocked, please contact admin  if you need any further information" });
                    else if (!bcrypt.compareSync(password, user.password)) {
                        return res.json({ errCode: 400, msg: 'Password mismatch' });
                    } else {
                        req.session.userId = user._id;
                        let resData = { user: user };
                        return res.json({ errCode: 200, msg: 'Success', data: resData });
                    }
                }
            });
        }
        if (user) {
            if (user.isBlock === 1) return res.status(400).json({ errCode: 400, msg: "User was blocked, please contact admin  if you need any further information" });
            if (!bcrypt.compareSync(password, user.password)) {
                return res.json({ errCode: 400, msg: 'Password mismatch' });
            } else {
                req.session.userId = user._id;
                let resData = { user: user };
                return res.json({ errCode: 200, msg: 'Success', data: resData });
            }
        }

    });
}
module.exports = login;