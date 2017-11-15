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
var welcomePath = viewPath + "welcome.html"
var signInPath = viewPath + "pages-signin.html"

router.get("/", (req, res) => {
    console.log('Cookies: ', req.cookies)    
    res.sendFile(welcomePath)
});

router.get("/Welcome", (req, res) => {
    console.log('Cookies: ', req.cookies)    
    res.sendFile(welcomePath)
});

router.get("/SignIn", (req, res) => {
    console.log('Cookies: ', req.cookies)    
    res.sendFile(signInPath)
});

router.post("/Trial", (req, res) => {
    res.end("This is trial data")
})




module.exports = router;