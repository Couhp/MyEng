'use strict';
/**
 * THE USER ROUTER
 * 
 * ROOT : "localhost:3000/MyEng/"
 */
var express = require('express');
var http = require('http');
var router = express.Router();

const mainFile = process.cwd() + "/app/views/public/html/main.html";
const welcomeFile = process.cwd() + "/app/views/public/html/welcome.html";


router.get("/", (req, res) => {
    if (req.session.userId === null || req.session.userId === undefined) {
        res.sendFile(welcomeFile)
    } else {
        res.sendFile(mainFile)
    }
});

router.post("/", (req, res) => {
    var message = req.body.message
    console.log("my session ; ", req.session)
    var my_session = req.session
    if (message == "setCookie") {
        res.json(my_session)
    }
})


module.exports = router;