const mongoose = require(global.__base + '/app/config/database/mongoose');
const { Schema } = mongoose;

const UserSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    livingIn: {
        type: String,
        required: true
    },

    birthday: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    streak: {
        type: Number
    },
    isBlock: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    friendlist: {
        type: Array
    },
    current_level: Number,
    current_topic_Id: String,
    current_course_Id: String
});

module.exports = mongoose.model('User', UserSchema);