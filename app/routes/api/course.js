const express = require('express');
const router = express.Router();
const courseController = require(global.__base + '/app/controllers/course/index.js');
router.get('/create', courseController.createDB);
module.exports = router;