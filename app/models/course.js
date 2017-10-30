const mongoose = require(`${r}/config/database/mongoose`)

const { Schema } = mongoose;
var courseSchema = new Schema({
  name: String,
  description : String,
  topics :{
    type : Array,
    default: []
  }
  
})

var CourseSchema = mongoose.model('Course', courseSchema);

module.exports = CourseSchema;
