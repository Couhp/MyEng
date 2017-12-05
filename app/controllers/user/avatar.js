const User = require(global.__base + '/app/models/user.js');
const mongoose = require("mongoose");
let avatar = (req, res) => {
    console.log(req.file)
    if (req.file === null || req.file.undefined) {
        return res.json({ errCode: 404, msg: "Vui lòng chọn hình ảnh tử máy tính" });
    } else if (req.file != null && req.file != undefined && req.file.mimetype.indexOf("image") === -1) {
        return res.json({ errCode: 413, msg: "Unsupported media type" });
    } else {
        let info = {
            avatar: req.file.path
        }
        let userid = new mongoose.Types.ObjectId(req.session.userId);
        User.update({ _id: userid }, info, { upsert: true }).exec((err) => {
            if (err) return res.json({ errCode: 500, msg: 'Internal error' });
            else {
                res.redirect('/MyEng/' + req.session.userId);
            }
        });
    }
}
module.exports = avatar