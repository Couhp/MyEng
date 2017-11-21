const mongoose = require(global.__base + '/app/config/database/mongoose');
const { Schema } = mongoose;

const fillSchema = new Schema({
    quesion: { type: String, required: true },
    answer: { type: Array, required: true },
    // Answer is a list of accepted answer
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'topic'
    }

});

module.exports = mongoose.model('fillQuestion', fillSchema);