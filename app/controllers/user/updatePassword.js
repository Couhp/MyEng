const User = require(global.__base + '/app/models/user.js');
const utils = require(global.__base + 'app/utils/index');
const bcrypt = require('bcrypt-nodejs');

let updatePass = (req, res) => {
    let id = req.session.userId;
    let oldP = req.body.oldP;
    let newP = req.body.newP;
    User.findOne({ _id: id }).exec((err, user) => {
        if (err) return res.json({ errCode: 500, msg: "Internal error" });
        else {
            if (!bcrypt.compareSync(oldP, user.password)) return res.json({ errCode: 400, msg: "Mật khẩu hiện tại không đúng" });
            else {
                let info = {
                    password: bcrypt.hashSync(req.body.newP)
                }
                User.update({ _id: id }, info, { upsert: true }).exec((err) => {
                    if (err) return res.json({ errCode: 500, msg: "Internal error" });
                    else return res.json({ errCode: 200, msg: "Success" });
                })
            }
        }
    })
}
module.exports = updatePass;