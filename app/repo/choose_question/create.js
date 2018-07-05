const CQuestion = require(global.__base + 'app/models/choose_question.js');
module.exports = (info) => {
    return new Promise((resolve, reject) => {
        let course = new CQuestion(info);
        course.save(err => {
            if (err) reject(err);
        })
    });
};