const User = require(global.__base + '/app/models/user.js');

module.exports = (info) => {
    return new Promise((resolve, reject) => {
        User.findOne({ username: info.username }).exec((err, user) => {
            if (err) reject(err);
            if (!user) {
                let user = new User(info);
                user.save(err => {
                    if (err) reject(err);
                });
                resolve(user);
            } else {

            }
        });
    })
}