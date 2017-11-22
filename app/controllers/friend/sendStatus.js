const Friend = require(global.__base + '/app/models/friendship.js');

let sendStatus = (req, res) => {
    let info = {
        user1: req.body.user1,
        user2: req.body.user2,
        status: req.body.status
    }
    let friend = new Friend(info);
    friend.save((err) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        else return res.status(200).json({ errCode: 200, msg: "Success" });
    });
}
module.exports = sendStatus;