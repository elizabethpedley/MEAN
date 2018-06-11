const mongoose = require('mongoose'),
      Quote = mongoose.model('Quote'),
      quotes = require('../controllers/quotes.js');

module.exports = function(app){

    app.get('/', function(req, res) {
        quotes.index(req,res);
    })
    app.get('/quotes', function(req, res) {
        quotes.quotes(req,res);
    })
    app.post('/new', function(req,res){
        quotes.new(req,res);
    })
};