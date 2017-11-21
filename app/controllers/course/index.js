const create = require(global.__base + 'app/controllers/course/create.js');
const getCourse = require(global.__base + '/app/controllers/course/getAllCourse.js');
const courseController = {
    createDB: create,
    getCourse: getCourse
}
module.exports = courseController;