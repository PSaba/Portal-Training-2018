var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    title: String,
    url: String,
    content: String
  })
  
  module.exports = mongoose.model('pages', pageSchema);