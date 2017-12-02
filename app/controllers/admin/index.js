const login = require(global.__base + 'app/controllers/admin/login.js');
const logout = require(global.__base + 'app/controllers/admin/logout.js');
const getAllUser = require(global.__base + 'app/controllers/admin/getAllUser.js');
const blockUser = require(global.__base + 'app/controllers/admin/blockUser.js');
const repFeedback = require(global.__base + 'app/controllers/admin/repFeedback.js');
const getFeedbackIsRep = require(global.__base + 'app/controllers/admin/getFeedbackIsRep.js');
const getAllFeedback = require(global.__base + 'app/controllers/admin/getAllFeedback.js');

const adminController = {
    login: login,
    logout: logout,
    getAllUser: getAllUser,
    blockUser: blockUser,
    repFeedback: repFeedback,
    getFeedbackIsRep: getFeedbackIsRep,
    getAllFeedback : getAllFeedback
}
module.exports = adminController;