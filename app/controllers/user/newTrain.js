const User = require(global.__base + '/app/models/user.js');
const redis = require('redis'),
    client = redis.createClient();;
let newTrain = (req, res) => {
    client.on("error", function(err) {
        console.log("Error " + err);
    });
    let userid = req.session.userid;
    let train = req.body.train;
    client.hmset(userid, "trainExp", train, 'EX', 86400, redis.print);
    client.hmset(userid, "tempExp", 0, 'EX', 86400, redis.print);
    client.hmset(userid, "active", true, 'EX', 86400, redis.print);
    client.quit()
    return res.json({ errCode: 200, msg: "Success" });

}
module.exports = newTrain;