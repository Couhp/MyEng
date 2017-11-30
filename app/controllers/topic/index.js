const create = require(global.__base + 'app/controllers/topic/create.js');
const getTopic = require(global.__base + 'app/controllers/topic/getTopicByCourse.js');

const topicController = {
    createDB: create,
    getTopic: getTopic
}
module.exports = topicController;