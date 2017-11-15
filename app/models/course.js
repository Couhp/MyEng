const mongoose = require(global.__base + '/app/config/database/mongoose');

const { Schema } = mongoose;
var coursesSchema = new Schema({
  name: String,
  description: String,
})

var CoursesSchema = mongoose.model('Course', coursesSchema);

module.exports = CoursesSchema;