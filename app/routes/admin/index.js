'use strict';
/**
 * THE USER ROUTER
 * 
 * ROOT : "localhost:3000/MyEng/"
 */
var express = require('express');
var http = require('http');
var router = express.Router();

const signInRouter = require(global.__base + 'app/routes/admin/signin.js');
const mainRouter = require(global.__base + 'app/routes/admin/main.js');

router.use("/SignIn", signInRouter)
router.use("/Main", mainRouter)

module.exports = router;