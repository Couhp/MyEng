'use strict';
/**
 * THE USER ROUTER
 * 
 * ROOT : "localhost:3000/MyEng/"
 */
var express = require('express');
var http = require('http');
var router = express.Router();

const file = process.cwd() + "/app/views/public/html/about-us.html";



router.get("/", (req, res) => {
        res.sendFile(file)
});




module.exports = router;