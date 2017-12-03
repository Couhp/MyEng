const express = require('express');
const router = express.Router();
const chooseController = require(global.__base + '/app/controllers/choose_question/index.js');
router.get('/create', chooseController.createDB);
router.post('/question', chooseController.getChoose);
module.exports = router;