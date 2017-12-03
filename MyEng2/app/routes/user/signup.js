'use strict';
/**
 * THE USER ROUTER
 * 
 * ROOT : "localhost:3000/MyEng/"
 */
var express = require('express');
var http = require('http');
var router = express.Router();

const signupFile = process.cwd() + "/app/views/public/html/pages-signup.html";


router.get("/", (req, res)=> {
    res.sendFile(signupFile)
})






module.exports = router;