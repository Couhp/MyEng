'use strict';

const signup = require(global.__base + 'app/controllers/user/signup');
const login = require(global.__base + 'app/controllers/user/login');
const logout = require(global.__base + 'app/controllers/user/logout');
const update = require(global.__base + 'app/controllers/user/update.js');
const getInfo = require(global.__base + 'app/controllers/user/getInfo.js');
const updateExp = require(global.__base + 'app/controllers/user/updateEXP.js');
const avatar = require(global.__base + 'app/controllers/user/avatar.js');
const createFeedback = require(global.__base + 'app/controllers/user/createFeedback.js');
const info = require(global.__base + 'app/controllers/user/info.js');
const getFeedback = require(global.__base + 'app/controllers/user/getfeedback.js');
const myFeedback = require(global.__base + 'app/controllers/user/myFeedback.js');
const updateLevel = require(global.__base + 'app/controllers/user/updateLevel.js');
const updatePass = require(global.__base + 'app/controllers/user/updatePassword.js');
const newTrain = require(global.__base + 'app/controllers/user/newTrain.js');
const getStreak = require(global.__base + 'app/controllers/user/getStreak.js');

const userController = {
    info: info,
    getInfo: getInfo,
    login: login,
    signup: signup,
    logout: logout,
    update: update,
    updateEXP: updateExp,
    updateLevel: updateLevel,
    avatar: avatar,
    createFeedback: createFeedback,
    getFeedback: getFeedback,
    myFeedback: myFeedback,
    updatePassword: updatePass,
    newTrain: newTrain,
    getStreak: getStreak
};

module.exports = userController;