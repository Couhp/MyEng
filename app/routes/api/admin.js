'use strict';

const express = require('express');
const router = express.Router();
const adminController = require(global.__base + 'app/controllers/admin/index');
const deserializeAdmin = require(global.__base + 'app/controllers/middleware/deserializeAdmin.js');
const isAdmin = require(global.__base + 'app/controllers/middleware/isAdmin.js');

router.post("/login", adminController.login);
router.get("/logout", isAdmin, deserializeAdmin, adminController.logout);
router.get("/all-user", isAdmin, deserializeAdmin, adminController.getAllUser);
router.post("/block", isAdmin, deserializeAdmin, adminController.blockUser);
router.post("/reply-feedback", isAdmin, deserializeAdmin, adminController.repFeedback);
router.get("/get-feedback", isAdmin, deserializeAdmin, adminController.getAllFeedback);
router.get("/get-feedback-is-reply", isAdmin, deserializeAdmin, adminController.getFeedbackIsRep);

module.exports = router;