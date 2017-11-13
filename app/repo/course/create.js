const Course = require(global.__base + 'app/models/course.js');
module.exports = (info) => {
    return new Promise((resolve, reject) => {
        let course = new Course(info);
        course.save(err => {
            if (err) reject(err);
        })
    });
};