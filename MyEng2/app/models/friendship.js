const mongoose = require(global.__base + '/app/config/database/mongoose');
const { Schema } = mongoose;

const FriendshipSchema = Schema({
    user1: {
        type: String,
        require: true
    },
    user2: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        require: true
    }
    //Status:
    // 1 : confirm
    // 2 : friend
    // 3 : block 
});
module.exports = mongoose.model('Friend', FriendshipSchema);