const Fill = require(global.__base + 'app/models/fill_question.js');
const mongoose = require('mongoose');

let addFill = (req, res) => {
    let id = new mongoose.Types.ObjectId(req.body.topicid);
    let info = {
        quesion: req.body.question,
        answer: req.body.answer.split(","),
        topic: id
    };
    let fill = new Fill(info);
    fill.save((err) => {
        if (err) return res.json({ errCode: 500, msg: err })
    })

}
module.exports = addFill;