const mongoose = require(`${r}/config/database/mongoose`)

const { Schema } = mongoose;
var coursesSchema = new Schema({
  name: String,
  description : String,
  topic :{
    type : Array,
    default: []
  },
  level : Number
})

var CoursesSchema = mongoose.model('Course', coursesSchema);

module.exports = CoursesSchema;
