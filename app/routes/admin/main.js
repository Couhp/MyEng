'use strict';
/**
 * THE USER ROUTER
 * 
 * ROOT : "localhost:3000/MyEng/"
 */
var express = require('express');
var http = require('http');
var router = express.Router();

const file = process.cwd() + "/app/views/public/html/admin.html";
const signinFile = process.cwd() + "/app/views/public/html/admin-signin.html";

router.get("/", (req, res) => {
    if (req.session.adminId === null || req.session.adminId === undefined) {
        res.sendFile(signinFile)
    } else {
        res.sendFile(file)
    }
})


module.exports = router;