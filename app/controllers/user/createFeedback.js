const User = require(global.__base + '/app/models/user.js');
const Feedback = require(global.__base + '/app/models/feedback.js');
const mongoose = require('mongoose');
let createFeedback = (req, res) => {
    let info = {
        content: req.body.content,
        isRep: 0,
        reply: "",
        user: new mongoose.Types.ObjectId(req.session.userId)
    }
    let feedback = new Feedback(info);
    feedback.save((err) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        else return res.status(200).json({ errCode: 200, msg: "Success" });
    })
}
module.exports = createFeedback;