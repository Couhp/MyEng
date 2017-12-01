const User = require(global.__base + '/app/models/user.js');
const utils = require(global.__base + 'app/utils/index');
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
let sigup = (req, res) => {
    // Check key not exists
    let keys = ['username', 'email', 'password', 'displayName', 'birthday', 'livingIn'];
    let notExists = utils.checkKeysNotExists(req.body, keys);
    if (notExists !== -1) {
        return res.status(400).json({
            errCode: -1,
            msg: 'Missing argument ' + keys[notExists]
        });
    }
    // Check mail
    if (!utils.checkMail(req.body.email)) {
        return res.status(400).json({ errCode: -1, msg: 'Invalid email format' });
    }
    // Check date
    if (!moment(req.body.birthday).isValid()) {
        return res.status(400).json({ errCode: -1, msg: 'Invalid date format' });
    }
    //Check type avatar
    // if (req.file != null && req.file != undefined && req.file.mimetype.indexOf("image") === -1) {
    //     return res.status(413).json({ errCode: 413, msg: "Unsupported media type" });
    // }
    let info = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        displayName: req.body.displayName,
        birthday: moment(req.body.birthday, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        livingIn: req.body.livingIn,
        gender: req.body.gender === 'Nam' ? 0 : 1,
        isBlock: 0,
        avatar: "/upload/images/default-avt",
        job: req.body.job,
        streak: 0,
        current_level: 1,
        current_topic_Id: "",
        current_course_Id: ""
    };
    User.findOne({ username: info.username }).exec((err, user) => {
        if (err) res.status.json({ errCode: 500, msg: 'Internal error' });
        if (!user) {
            let newUser = new User(info);
            newUser.save(err => {
                if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                else {
                    User.findOne({ username: newUser.username }).exec((err, user) => {
                        if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                        else {
                            let resData = { user: user };
                            req.session.userId = user._id
                            return res.status(200).json({ errCode: 200, msg: "Success", data: resData });
                        }
                    });
                }
            });

        } else {
            return res.status(400).json({ errCode: 400, msg: 'User already exists' });
        }
    });
}
module.exports = sigup;