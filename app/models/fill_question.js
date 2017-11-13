const mongoose = require(global.__base + '/app/config/database/mongoose');
const { Schema } = mongoose;
<<<<<<< HEAD
const fillSchema= new Schema({
    quesion     : {type :String, required : true},
    answer      : {type :Array, required : true},
    // Answer is a list of accepted answer
    topic :{
		type: Schema.Types.ObjectId,
		ref: 'topic'
	}
=======
const fillSchema = new Schema({
    quesion: { type: String, required: true },
    answer: { type: String, required: true },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }
>>>>>>> d97854c5283ca49042b010626507b0565dc79d1e
});

module.exports = mongoose.model('fillQuestion', fillSchema);