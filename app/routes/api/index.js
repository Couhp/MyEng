const express = require('express');
const router = express.Router();
const session = require(global.__base + 'app/config/session/session');
const topic = require('./topic.js');
const course = require('./course.js');
const user = require('./user.js');
const friend = require('./friend.js')
router.use(session);
router.use('/course', course);
router.use('/topic', topic);
router.use('/user', user);
router.use('/friend', friend);

module.exports = router;