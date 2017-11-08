const mongoose = require(global.__base + '/app/config/database/mongoose')
const { Schema } = mongoose;

var topicSchema = new Schema({
    name: String,
    description: String,
    course: {
        type: Schema.Types.ObjectId,
        Ref: 'Course'
    }
})

module.exports = mongoose.model('Topic', topicSchema);