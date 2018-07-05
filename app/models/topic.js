const mongoose = require(global.__base + '/app/config/database/mongoose')
const { Schema } = mongoose;

var topicSchema = new Schema({
    name: String,
    description: String,
    course: {
        type: Schema.Types.ObjectId,
        Ref: 'Course'
    },
    exp_topic: {
        type: Number,
        default: 100
    }
})

module.exports = mongoose.model('Topic', topicSchema);