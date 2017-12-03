const getStatus = require(global.__base + 'app/controllers/friend/getStatus.js');
const sendStatus = require(global.__base + 'app/controllers/friend/sendStatus.js');
const confirmStatus = require(global.__base + 'app/controllers/friend/confirmStatus.js');

const friend = {
    getStatus: getStatus,
    sendStatus: sendStatus,
    confirmStatus: confirmStatus
}

module.exports = friend;