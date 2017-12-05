'use strict';
/**
 * THE USER ROUTER
 * 
 * ROOT : "localhost:3000/MyEng/"
 */
var express = require('express');
var http = require('http');
var router = express.Router();

const mainFile = process.cwd() + "/app/views/public/html/trial.html";


router.get("/", (req, res) => {
    res.sendFile(mainFile)
});



module.exports = router;