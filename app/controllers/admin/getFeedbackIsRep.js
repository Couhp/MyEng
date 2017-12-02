const Admin = require(global.__base + '/app/models/admin.js');
const Feedback = require(global.__base + '/app/models/feedback.js');
const mongoose = require('mongoose');
let getFeedbackIsRep = (req, res) => {
    Feedback.find({ isRep: 1 }).exec((err, feedback) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        else {
            return res.status(200).json({ errCode: 200, msg: "Success", data: feedback });

        }
    });
}
module.exports = getFeedbackIsRep;