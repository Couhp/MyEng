const Admin = require(global.__base + '/app/models/admin.js');
const Feedback = require(global.__base + '/app/models/feedback.js');
const mongoose = require('mongoose');
let delFeedback = (req, res) => {
    let id = new mongoose.Types.ObjectId(req.body.feedbackId);
    let info = {
        reply: req.body.reply,
        isRep: 1
    }
    Feedback.remove({ _id: id }).exec((err) => {
        if (err) return res.json({ errCode: 500, msg: "Internal error" });
        else {
            return res.json({ errCode: 200, msg: "Success" });
        };
    });
}
module.exports = delFeedback;