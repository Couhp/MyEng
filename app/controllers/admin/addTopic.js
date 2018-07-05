const Topic = require(global.__base + '/app/models/topic.js');
const mongoose = require('mongoose');
let addTopic = (req, res) => {
    let id = new mongoose.Types.ObjectId("5a1224a17605d32d985a8156")
    let info = {
        name: req.body.name,
        description: req.body.description,
        course: id,
        exp_topic: req.body.exp
    };
    let topic = new Topic(info);
    topic.save((err) => {
        if (err) return res.json({ errCode: 500, msg: err });
    })
}
module.exports = addTopic;