'use strict';

const express = require('express');
const router = express.Router();
const userController = require(global.__base + 'app/controllers/user/index');
const deserializeUser = require(global.__base + 'app/controllers/middleware/deserializeUser.js');
const isUser = require(global.__base + 'app/controllers/middleware/isUser.js');
var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload/images');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
router.post('/getinfo', userController.getInfo);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/logout', isUser, deserializeUser, userController.logout);
router.put('/update', isUser, deserializeUser, upload.single("file"), userController.update);
router.put('/exp', isUser, deserializeUser, userController.updateEXP);
router.post('/avt', isUser, deserializeUser, upload.single("file"), userController.avatar);
router.post('/feedback', isUser, deserializeUser, userController.createFeedback);
module.exports = router;