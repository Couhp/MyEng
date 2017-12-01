const Admin = require(global.__base + '/app/models/admin.js');
const Feedback = require(global.__base + '/app/models/feedback.js');
const mongoose = require('mongoose');
let repFeedback = (req, res) => {
    let id = new mongoose.Types.ObjectId(req.body.feedbackId);
    let info = {
        reply: req.body.reply,
        isRep: 1
    }
    Feedback.update({ _id: id }, info, { upsert: true }).exec((err) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        else {
            Feedback.findOne({ _id: id }).exec((err, feedback) => {
                if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
                else {
                    return res.status(200).json({ errCode: 200, msg: "Success", data: feedback });
                }
            });
        }
    });
}
module.exports = repFeedback;