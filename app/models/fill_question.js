const mongoose = require(global.__base + '/app/config/database/mongoose');
const { Schema } = mongoose;
const fillSchema = new Schema({
    quesion: { type: String, required: true },
    answer: { type: String, required: true },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }
});

module.exports = mongoose.model('fillQuestion', fillSchema);