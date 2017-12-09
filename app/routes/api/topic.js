const express = require('express');
const router = express.Router();
const topicController = require(global.__base + '/app/controllers/topic/index.js');
router.get('/create', topicController.createDB);
router.post('/all', topicController.getTopic);
router.post('/all-question', topicController.getQuestion);

module.exports = router;