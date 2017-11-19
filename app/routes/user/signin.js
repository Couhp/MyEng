'use strict';
/**
 * THE USER ROUTER
 * 
 * ROOT : "localhost:3000/MyEng/"
 */
var express = require('express');
var http = require('http');
var router = express.Router();

const signinFile = process.cwd() + "/app/views/public/html/pages-signin.html";


router.get("/", (req, res)=> {
    res.sendFile(signinFile)
})



module.exports = router;