const create = require(global.__base + '/app/repo/topic/create.js');
const mongoose = require('mongoose');

let createDB = (req, res) => {
    let id = new mongoose.Types.ObjectId("5a1224a17605d32d985a8156")

    let info = {
        name: "Job",
        description: "Learn some words in Job topic",
        course: id
    };
    create(info)
    return res.json({ msg: "Success" });
}
module.exports = createDB;