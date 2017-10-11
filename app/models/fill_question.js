const mongoose = require(`${r}/config/database/mongoose`)

/////// SCHEMA ////////
/*
**  DESCRIPTION :
    The quesion of "fill in the blank"
    Ex : {
            "question" : "Tung is an ... boy",
            "answer"   : "occho"
        }
    Warning : "answer" should be lower case for good matching
*/
const { Schema } = mongoose;
const fillSchema= new Schema({
    quesion     : {type :String, required : true},
    answer      : {type :String, required : true},
    level       : {type :Number, required: true},
    topic       : {type :String, required: true}
});

module.exports = mongoose.model('fillQuestion', fillSchema);
