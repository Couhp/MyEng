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
const notFoundFile = process.cwd() + "/app/views/public/html/404.html";

router.get("/", (req, res) => {
    res.sendFile(welcomeFile)
})

router.get("/*", (req, res) => {
    if (req.session.userId === null || req.session.userId === undefined) {
        res.sendFile(welcomeFile)
    } else {
        res.sendFile(notFoundFile)
    }
})



module.exports = router;