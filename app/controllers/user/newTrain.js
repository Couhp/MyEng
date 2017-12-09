const User = require(global.__base + '/app/models/user.js');
const redis = require('redis'),
    client = redis.createClient();
let newTrain = (req, res) => {
    console.log(req.body)
    client.on("error", function(err) {
        console.log("Error " + err);
    });
    let userid = req.session.userId;
    let train = req.body.train;
    client.hmset(userid, "trainExp", train);
    client.hmset(userid, "tempExp", 0);
    client.hmset(userid, "date", 0);
    client.expire(userid, 86400);
    res.redirect("/MyEng/" + userid);
}
module.exports = newTrain;