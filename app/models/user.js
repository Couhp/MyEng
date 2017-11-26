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
        type: Number,
        default: 0
    },
    isBlock: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    current_level: {
        type: Number,
        default: 1
    },
    exp: {
        type: Number,
        default: 0
    },
    topic: {
        type: Array,
        default: []
    },
    current_topic_Id: String,
    current_course_Id: String
});

module.exports = mongoose.model('User', UserSchema);