const Friends = requires(global.__base + '/app/models/friendship.js');
let confirm = (req, res) => {
    let info = {
        user1: req.body.user1,
        user2: req.body.user2,
        status: 2
    }
    Friends.update({ user1: info.user1, user2: info.user2 }, info, { upsert: true }).exec((err) => {
        if (err) return res.status(500).status({ errCode: 500, msg: "Interal error" });
        else return res.status(200).json({ errCode: 200, msg: "Success" });
    });
}
module.exports = confirm;