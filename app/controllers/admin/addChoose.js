const Choose = require(global.__base + 'app/models/choose_question.js');
const mongoose = require('mongoose');

let addChoose = (req, res) => {
    let id = new mongoose.Types.ObjectId(req.body.topicid);
    let info = {
        quesion: req.body.question,
        option: req.body.option.split(","),
        answer: req.body.answer,
        topic: id
    };
    let choose = new Choose(info);
    choose.save((err) => {
        if (err) return res.json({ errCode: 500, msg: err })
    })

}
module.exports = addChoose;