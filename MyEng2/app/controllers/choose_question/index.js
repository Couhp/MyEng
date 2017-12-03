const create = require(global.__base + 'app/controllers/choose_question/create.js');
const getChoose = require(global.__base + 'app/controllers/choose_question/getChoose.js');

const courseController = {
    createDB: create,
    getChoose: getChoose
}
module.exports = courseController;