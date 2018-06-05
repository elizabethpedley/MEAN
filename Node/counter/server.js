
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

    if(req.session.count){
        req.session.count += 1;
    }else{
        req.session.count = 1;
    }
    var count = req.session.count;
    res.render("index", {count:count});
})
app.get('/increase', function(req, res){
    req.session.count += 1;
    res.redirect('/')
})
app.get('/reset', function(req, res){
    req.session.count = 0;
    res.redirect('/')
})
app.listen(8000, function() {
 console.log("listening on port 8000");
});