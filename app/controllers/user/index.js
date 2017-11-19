'use strict';

const signup = require(global.__base + 'app/controllers/user/signup');
const login = require(global.__base + 'app/controllers/user/login');
const logout = require(global.__base + 'app/controllers/user/logout');
const update = require(global.__base + 'app/controllers/user/update.js');
const getInfo = require(global.__base + 'app/controllers/user/getInfo.js');

const userController = {
    getInfo: getInfo,
    login: login,
    signup: signup,
    logout: logout,
    update: update
};

module.exports = userController;