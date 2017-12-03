const FQuestion = require(global.__base + 'app/models/fill_question.js');
module.exports = (info) => {
    return new Promise((resolve, reject) => {
        let course = new FQuestion(info);
        course.save(err => {
            if (err) reject(err);
        })
    });
};