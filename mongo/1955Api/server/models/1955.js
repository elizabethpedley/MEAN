const mongoose = require('mongoose')

var PersonSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2}
   },{timestamp: true})
   
mongoose.model('Person', PersonSchema);