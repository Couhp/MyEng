const Fill = require(global.__base + 'app/models/fill_question.js');
const mongoose = require('mongoose');

let getFill = (req, res) => {
    let topic = new mongoose.Types.ObjectId(req.body.topicid);
    Fill.find({ topic: topic }).exec((err, fill) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        else {
            let data = [];
            for (let i = 0; i < 4; i++) {
                let idx = Math.floor(Math.random() * fill.length);
                data.push(fill[idx]);
                fill.splice(idx, 1)
            }
            return res.status(200).json({ errCode: 200, msg: "Success", data: data });
        }
    });


}
module.exports = getFill;