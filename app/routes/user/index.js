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
const feedBack = require(global.__base + 'app/routes/user/feedback.js');
const profile = require(global.__base + 'app/routes/user/profile.js');
const contact = require(global.__base + 'app/routes/user/contact.js');
const trial = require(global.__base + 'app/routes/user/trial.js');
const us = require(global.__base + 'app/routes/user/About.js');

router.use("/SignIn", signInRouter)
router.use("/SignUp", signUpRouter)
router.use("/Welcome", welcomeRouter)
router.use("/Main", mainRouter)
router.use("/Feedback", feedBack)
router.use("/Contact", contact)
router.use("/Trial", trial)
router.use("/AboutUs", us)
router.use("/:id", profile)

router.use("/", rootRouter)



module.exports = router;