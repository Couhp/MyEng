const Course = require(global.__base + 'app/models/course.js');
const mongoose = require('mongoose');

let getCourse = (req, res) => {
    Course.find().exec((err, course) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        else {
            return res.status(200).json({ errCode: 200, msg: "Success", data: course });
        }
    });

}

module.exports = getCourse;