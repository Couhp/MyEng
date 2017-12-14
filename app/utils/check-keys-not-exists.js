"use strict";

let checkKeysNotExists = (obj, keys) => {
    if (Array.isArray(keys)) {
        for (let i = 0; i < keys.length; i++) {
            // console.log(keys[i])
            // console.log(typeof obj[keys[i]])
            if (obj[keys[i]] === null || obj[keys[i]] === undefined || obj[keys[i]] === "") {
                return i;
            }
        }
    } else if (obj[keys] === null || obj[keys] === undefined || obj[keys[i]] === "") {
        return 0;
    }
    return -1;
}

module.exports = checkKeysNotExists;