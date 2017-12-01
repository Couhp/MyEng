const mongoose = require(global.__base + '/app/config/database/mongoose')
const { Schema } = mongoose;

var feedbackSchema = new Schema({
    content: String,
    isRep: {
        type: Number,
        default: 0
    },
    reply: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('Feedback', feedbackSchema);