const mongoose = require(`${r}/config/database/mongoose`)
const { Schema } = mongoose;
const fillSchema= new Schema({
    quesion     : {type :String, required : true},
    answer      : {type :String, required : true},
    topic :{
		type: Schema.Types.ObjectId,
		ref: 'topic'
	}
});

module.exports = mongoose.model('fillQuestion', fillSchema);
