'use strict';

require('dotenv').load();
global.__base = process.cwd() + '/';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

app.use(express.static(global.__base + '/app/views/public'));
app.use(express.static(global.__base + '/upload/images'));

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ROUTING
const apiRouter = require(process.cwd() + "/View/routes/index.js");
app.use('/', apiRouter);
require('events').EventEmitter.prototype._maxListeners = 100;


var port =  3000

app.listen(port, function() {
console.log("App is listening at " + port)
});