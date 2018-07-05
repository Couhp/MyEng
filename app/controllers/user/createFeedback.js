const User = require(global.__base + '/app/models/user.js');
const Feedback = require(global.__base + '/app/models/feedback.js');
const mongoose = require('mongoose');
let createFeedback = (req, res) => {
    if (req.session.userId !== null && req.session.userId !== undefined) {
        let info = {
            subject: req.body.subject,
            content: req.body.content,
            isRep: 0,
            reply: "",
            user: new mongoose.Types.ObjectId(req.session.userId)
        }
        let feedback = new Feedback(info);
        feedback.save((err) => {
            if (err) return res.json({ errCode: 500, msg: "Internal error" });
            else return res.json({ errCode: 200, msg: "Success" });
        })

    } else {
        let info = {
            subject: "SUPPORT - " + req.body.name,
            content: req.body.content,
            isRep: 0,
            reply: ""
        }
        let feedback = new Feedback(info);
        feedback.save((err) => {
            if (err) return res.json({ errCode: 500, msg: "Internal error" });
            else return res.json({ errCode: 200, msg: "Success" });
        })
    }
}
module.exports = createFeedback;