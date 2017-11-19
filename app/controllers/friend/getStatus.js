const Friends = require(global.__base + '/app/models/friendship.js');
let getStatus = (req, res) => {
    let userid = req.body.userid;
    Friends.find({ user1: userid }).exec((err, friend) => {
        if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
        else {
            Friends.find({ user2: userid }).exec((err, friend2) => {
                if (err) return res.status(500).json({ errCode: 500, msg: "Internal error" });
                else {
                    let resData = { 1: friend, 2: friend2 }
                    return res.status(200).json({ errCode: 200, msg: "Success", data: resData });
                }
            });
        }
    });
};
module.exports = getStatus;