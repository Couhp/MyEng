const Topic = require(global.__base + 'app/models/topic.js');
const mongoose = require('mongoose');

let getTopicByCourse = (req, res) => {
    let id = new mongoose.Types.ObjectId(req.body.courseid);
    Topic.find({ course: id }).exec((err, topic) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        else {
            return res.status(200).json({ errCode: 200, msg: "Success", data: topic });
        }
    })

}

module.exports = getTopicByCourse;