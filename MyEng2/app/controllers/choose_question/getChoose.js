const Choose = require(global.__base + 'app/models/choose_question.js');
const mongoose = require('mongoose');

let getChoose = (req, res) => {
    let topic = new mongoose.Types.ObjectId(req.body.topicid);
    Choose.find({ topic: topic }).exec((err, choose) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        else {
            let data = [];
            for (let i = 0; i < 6; i++) {
                let idx = Math.floor(Math.random() * choose.length);
                data.push(choose[idx]);
                choose.splice(idx, 1)
            }
            return res.status(200).json({ errCode: 200, msg: "Success", data: data });
        }
    });


}
module.exports = getChoose;