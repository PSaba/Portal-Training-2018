var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    title: {type: String, required: true},
    url: {type: String, required: true},
    content: {type: String, required: true},
    user: {type: Object, required: true},
    visible: {type: Boolean, default: true}
  });
  
  module.exports = mongoose.model('pages', pageSchema);