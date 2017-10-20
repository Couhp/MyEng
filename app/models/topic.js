const mongoose = require(`${r}/config/database/mongoose`)

const { Schema } = mongoose;

var topicSchema = new Schema({
    name        : String,
    description : String,
    quesions     :
    {
        type    : Array,
        default : []
    }
})

module.exports  = mongoose.model('Topic', topicSchema);
