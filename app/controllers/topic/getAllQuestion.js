const Fill = require(global.__base + 'app/models/fill_question.js');
const Choose = require(global.__base + 'app/models/choose_question.js');

const mongoose = require('mongoose');

let getQuestion = (req, res) => {
    let topic = new mongoose.Types.ObjectId(req.body.topicid);
    Fill.find({ topic: topic }).exec((err, fill) => {
        if (err) return res.json({ errCode: 500, msg: "Internal error" });
        else {
            Choose.find({ topic: topic }).exec((err, choose) => {
                if (err) return res.json({ errCode: 500, msg: "Internal error" });
                else {
                    let data = { fill: fill, choose: choose }
                    return res.json({ errCode: 200, msg: "Success", data: data });
                }

            })
        }
    });


}
module.exports = getQuestion;