'use strict';
/**
 * THE USER ROUTER
 * 
 * ROOT : "localhost:3000/MyEng/"
 */
var express = require('express');
var http = require('http');
var router = express.Router();

const mainFile = process.cwd() + "/app/views/public/html/feedback.html";


router.get("/", (req, res)=> {
    console.log(" Cookie : ", req.session)
    res.sendFile(mainFile)
})


module.exports = router;