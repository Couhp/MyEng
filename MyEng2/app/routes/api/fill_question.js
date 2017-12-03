const express = require('express');
const router = express.Router();
const fillController = require(global.__base + '/app/controllers/fill_question/index.js');
router.get('/create', fillController.createDB);
router.post('/question', fillController.getFill);
module.exports = router;