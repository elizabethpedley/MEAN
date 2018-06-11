const mongoose = require('mongoose')

var QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    quote: {type: String, required: true, minlength: 5}
   })
   
mongoose.model('Quote', QuoteSchema);

