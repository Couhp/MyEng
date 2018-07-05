const Fill = require(global.__base + 'app/models/fill_question.js');
const mongoose = require('mongoose');

let createDB = (req, res) => {
    var lineReader = require('line-reader');
    let arr = [];
    let i = 0
    lineReader.eachLine(global.__base + '/topic4.fil', function(line, last) {
        arr.push(line)
        if (last) {
            for (i = 0; i < arr.length; i += 2) {
                let id = new mongoose.Types.ObjectId("5a23da24d25f79427c640442");
                let info = {
                    quesion: arr[i],
                    answer: arr[i + 1],
                    topic: id
                };
                let fill = new Fill(info);
                fill.save((err) => {
                    if (err) return res.json({ msg: "err" });
                });
            }
        }
    });
    return res.json({ msg: "success" });

}
module.exports = createDB;