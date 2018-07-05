const express = require('express');
const router = express.Router();
const courseController = require(global.__base + '/app/controllers/course/index.js');
router.get('/create', courseController.createDB);
router.get('/all', courseController.getCourse);
module.exports = router;