const create = require(global.__base + 'app/controllers/topic/create.js');
const getTopic = require(global.__base + 'app/controllers/topic/getTopicByCourse.js');
const getQuestion = require(global.__base + 'app/controllers/topic/getAllQuestion.js');

const topicController = {
    createDB: create,
    getTopic: getTopic,
    getQuestion: getQuestion
}
module.exports = topicController;