// 'use strict';
/**
 * THE INDEX ROUTER 
 * ROOT : "/"
 */
var express = require('express');
var router = express.Router();

const adminRouter = require(process.cwd() + "/app/routes/admin/index.js");
const userRouter = require(process.cwd() + "/app/routes/user/index.js")
const apiRouter = require(process.cwd() + "/app/routes/api/index.js");
const notfoundRouter = require(process.cwd() + "/app/routes/user/root.js");

router.use('/api', apiRouter)
// router.use('/admin', adminRouter);
router.use('/MyEng', userRouter);
router.use('/Admin', adminRouter);
router.use('/', notfoundRouter)

module.exports = router;