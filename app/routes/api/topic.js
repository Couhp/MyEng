const express = require('express');
const router = express.Router();
const topicController = require(global.__base + '/app/controllers/topic/index.js');
router.get('/create', topicController.createDB);
module.exports = router;