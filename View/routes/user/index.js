'use strict';
/**
 * THE USER ROUTER
 * 
 * ROOT : "localhost:3000/MyEng/"
 */
var express = require('express');
var http = require('http');
var router = express.Router();

var viewPath = process.cwd() + "/app/views/public/html/"
var mainPath = viewPath + "main.html"

router.get("/", (req, res) => {
    console.log('Cookies: ', req.cookies)    
    res.sendFile(mainPath)
});



module.exports = router;