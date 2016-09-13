var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TagSchema = new Schema({
  'tag_name' : String,	
  'subjects' : [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Tag', TagSchema);
