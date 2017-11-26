'use strict';
/**
 * THE USER ROUTER
 * 
 * ROOT : "localhost:3000/MyEng/"
 */
var express = require('express');
var http = require('http');
var router = express.Router();

const signInRouter = require(global.__base + 'app/routes/user/signin.js');
const signUpRouter = require(global.__base + 'app/routes/user/signup.js');
const welcomeRouter = require(global.__base + 'app/routes/user/welcome.js');
const mainRouter = require(global.__base + 'app/routes/user/main.js');
const rootRouter = require(global.__base + 'app/routes/user/root.js');

router.use("/SignIn", signInRouter)
router.use("/SignUp", signUpRouter)
router.use("/Welcome", welcomeRouter)
router.use("/Main", mainRouter)
router.use("/", rootRouter)


module.exports = router;