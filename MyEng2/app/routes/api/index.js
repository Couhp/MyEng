const express = require('express');
const router = express.Router();
const session = require(global.__base + 'app/config/session/session');
const topic = require('./topic.js');
const course = require('./course.js');
const user = require('./user.js');
const friend = require('./friend.js')
const choose = require('./choose_question.js');
const fill = require('./fill_question.js');
const admin = require('./admin');
router.use(session);
router.use('/admin', admin)
router.use('/fill', fill);
router.use('/course', course);
router.use('/topic', topic);
router.use('/user', user);
router.use('/friend', friend);
router.use('/choose', choose);
module.exports = router;