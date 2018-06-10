var express = require("express");
var path = require("path");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
const flash = require('express-flash');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(1337);
const io = require('socket.io')(server);
app.use(flash());
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
mongoose.connect('mongodb://localhost/qDojo');

var QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    quote: {type: String, required: true, minlength: 5}
   })
   // Store the Schema under the name 'User'
mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote')

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
    res.render("index");
})
app.get('/quotes', function(req, res) {
    Quote.find({},function(err,quotes){
        if(err){
            console.log('Something went wrong trying to display quotes.');
            console.log(err);
            res.redirect('/'); 
        }else{
            res.render("results", {quotes:quotes});
        }
    })
    
})
app.post('/new', function(req,res){
    var quote = new Quote({name: req.body.name, quote: req.body.quote});
    quote.save(function(err) {
        // if there is an error console.log that something went wrong!
        if(err) {
          console.log('something went wrong');
          console.log(err);
          for(var key in err.errors){
            req.flash('registration', err.errors[key].message);
            }
            // redirect the user to an appropriate route
            res.redirect('/');
        } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully added a quote!');
          res.redirect('/quotes');
        }
      })
})
