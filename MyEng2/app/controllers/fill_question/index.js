const create = require(global.__base + 'app/controllers/fill_question/create.js');
const getFill = require(global.__base + 'app/controllers/fill_question/getFill.js');

const fillController = {
    createDB: create,
    getFill: getFill
}
module.exports = fillController;