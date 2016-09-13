var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TodoSchema = new Schema({
  'title' : String,
  'description' : String,
  'due_date' : Date,
  'level': { type: Number, default: 1 },
  'tags': [ Schema.Types.ObjectId ]
});

module.exports = mongoose.model('Todo', TodoSchema);
