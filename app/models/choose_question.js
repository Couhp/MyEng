const mongoose = require(`${r}/config/database/mongoose`)
const { Schema } = mongoose;
const chooseSchema = new Schema({
    quesion     : {type : String, required : true},
    option      : { type : Array, default : ["a", "b", "c", "d"], required : true},
    answer      : {type : Number, max : 4, min : 1, required : true},
    topic :{
		type: Schema.Types.ObjectId,
		ref: 'Topic'
	}
});

module.exports = mongoose.model('chooseQuestion', chooseSchema);
