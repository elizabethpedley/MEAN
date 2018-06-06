// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
var session = require('express-session');
// create the express app
var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
    res.render("index");
})
app.post('/new', function(req, res){
    req.session.name = req.body.name;
    req.session.location = req.body.location;
    req.session.lang = req.body.lang;
    req.session.comment = req.body.comments;
    res.redirect('/result')
})
app.get('/result', function(req, res){
    res.render('result', {name:req.session.name,location:req.session.location,lang:req.session.lang,comment:req.session.comment})
})
app.listen(8000, function() {
 console.log("listening on port 8000");
});