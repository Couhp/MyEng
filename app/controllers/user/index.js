'use strict';

const signup = require(global.__base + 'app/controllers/user/signup');
const login = require(global.__base + 'app/controllers/user/login');
const logout = require(global.__base + 'app/controllers/user/logout');
const update = require(global.__base + 'app/controllers/user/update.js');
const getInfo = require(global.__base + 'app/controllers/user/getInfo.js');
const UpdateExp = require(global.__base + 'app/controllers/user/updateEXP.js');
const avatar = require(global.__base + 'app/controllers/user/avatar.js');
const createFeedback = require(global.__base + 'app/controllers/user/createFeedback.js');
const userController = {
    getInfo: getInfo,
    login: login,
    signup: signup,
    logout: logout,
    update: update,
    updateEXP: UpdateExp,
    avatar: avatar,
    createFeedback: createFeedback
};

module.exports = userController;