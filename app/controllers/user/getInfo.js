const User = require(global.__base + '/app/models/user.js');

let getInfo = (req, res) => {
    if (req.body.userid === null) {
        User.findOne({ _id: req.body.userid }).exec((err, user) => {
            if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
            else {
                return res.status(200).json({ errCode: 200, msg: "Success", data: user });
            }
        });
    } else {
        User.findOne({ username: req.body.username }).exec((err, user) => {
            if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
            else {
                return res.status(200).json({ errCode: 200, msg: "Success", data: user });
            }
        });
    }
}
module.exports = getInfo;