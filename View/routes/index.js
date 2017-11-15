'use strict';
/**
 * THE INDEX ROUTER 
 * ROOT : "/"
 */
var express = require('express');
var router = express.Router();

// const adminRouter = require(process.cwd() + "View/routes/admin/index.js");
const userRouter = require(process.cwd() + "/View/routes/user/index.js")

// router.use('/admin', adminRouter);
router.use('/MyEng', userRouter);


module.exports = router;