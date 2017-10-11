const mongoose = require(`${r}/config/database/mongoose`)
/////// SCHEMA ////////
/*
**  DESCRIPTION :
    The question with 4 options
*/
const { Schema } = mongoose;
const chooseSchema = new Schema({
    quesion     : {type : String, required : true},
    option      : { type : Array, default : ["a", "b", "c", "d"], required : true},
    answer      : {type : Number, max : 4, min : 1, required : true},
    level       : {type :Number, required: true},
    topic       : {type :String, required: true}
});

module.exports = mongoose.model('chooseQuestion', chooseSchema);
