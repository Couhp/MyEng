const Topic = require(global.__base + 'app/models/topic.js');
module.exports = (info) => {
    return new Promise((resolve, reject) => {
        let course = new Topic(info);
        course.save(err => {
            if (err) reject(err);
        })
    });
};