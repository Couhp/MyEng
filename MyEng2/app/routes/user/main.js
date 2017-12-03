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


router.get("/", (req, res)=> {
    console.log(" Cookie : ", req.session)
    res.sendFile(mainFile)
})

router.post("/", (req, res)=> {
    var message = req.body.message
    console.log("my session ; ", req.session)
    var my_session = req.session
    if (message == "setCookie") {
        res.json(my_session)
    }
})


module.exports = router;