const mongoose = require(`${r}/config/database/mongoose`)
const { Schema } = mongoose;
const chooseSchema = new Schema({
    quesion     : {type : String, required : true},
    option      : { type : Array, default : ["a", "b", "c", "d"], required : true},
    // Warning : Answer is index of option array, so it start from 0.
    answer      : {type : Number, max : 3, min : 0, required : true},
    topic :{
		type: Schema.Types.ObjectId,
		ref: 'Topic'
	}
});

module.exports = mongoose.model('chooseQuestion', chooseSchema);
