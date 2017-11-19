const express = require('express');
const router = express.Router();
const friend = require(global.__base + '/app/controllers/friend/index.js');
router.post('/send', friend.sendStatus);
router.get('/get', friend.getStatus);
router.post('/confirm', friend.confirmStatus);
module.exports = router;