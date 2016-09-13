var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var SubjectSchema = new Schema({
  'subject_name' : String,
  'description' : String
});

module.exports = mongoose.model('Subject', SubjectSchema);
