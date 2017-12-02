const User = require(global.__base + '/app/models/user.js');
const Feedback = require(global.__base + '/app/models/feedback.js');
const mongoose = require('mongoose');
let myFeedback = (req, res) => {
    let id = new mongoose.Types.ObjectId(req.session.userId);
    Feedback.find({ user: id }).exec((err, feedback) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        if (!feedback) return res.status(404).json({ errCode: 404, msg: "Not found" });
        else {
            return res.status(200).json({ errCode: 200, msg: "Success", data: feedback });
        }
    });
}
module.exports = myFeedback;