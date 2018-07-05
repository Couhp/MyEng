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
const mainFile = process.cwd() + "/app/views/public/html/feedback.html";
const contactFile = process.cwd() + "/app/views/public/html/contact.html";


router.get("/", (req, res) => {
    if (req.session.userId === null || req.session.userId === undefined) {
        res.sendFile(contactFile)
    } else {
        res.sendFile(mainFile)
    }
})


module.exports = router;