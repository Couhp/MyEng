'use strict';
/**
 * THE USER ROUTER
 * 
 * ROOT : "localhost:3000/MyEng/"
 */
var express = require('express');
var http = require('http');
var router = express.Router();

const welcomeFile = process.cwd() + "/app/views/public/html/welcome.html";


router.get("/", (req, res) => {
    res.sendFile(welcomeFile)
})




module.exports = router;