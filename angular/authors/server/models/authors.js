const mongoose = require('mongoose')

var AuthorSchema = new mongoose.Schema({
    name: {type: String}
   },{timestamp: true})
   
mongoose.model('Author', AuthorSchema);