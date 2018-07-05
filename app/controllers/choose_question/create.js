const Choose = require(global.__base + 'app/models/choose_question.js');
const mongoose = require('mongoose');

let createDB = (req, res) => {
    var lineReader = require('line-reader');
    let arr = [];
    let i = 0
    lineReader.eachLine(global.__base + '/topic4.opt', function(line, last) {
        arr.push(line)
        if (last) {
            console.log(arr)
            for (i = 0; i < arr.length; i += 3) {
                let id = new mongoose.Types.ObjectId("5a23d99949f91842b4e67c5e");
                let info = {
                    quesion: arr[i],
                    option: arr[i + 1].split("$"),
                    answer: arr[i + 2],
                    topic: id
                };
                let choose = new Choose(info);
                choose.save((err) => {
                    if (err) return res.json({ msg: "err" });
                });
            }
        }
    });
    return res.json({ msg: "success" });
}
module.exports = createDB;