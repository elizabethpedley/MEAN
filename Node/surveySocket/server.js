// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
var session = require('express-session');
// create the express app
var app = express();
var bodyParser = require('body-parser');
const server = app.listen(1337);
const io = require('socket.io')(server);
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

io.on('connection', function (socket) { //2
    console.log('in connection')
  
    socket.on('submit', function (data) { //7
        socket.emit('updated',{name: data.name, location: data.location, lang: data.lang,comment: data.comment});
        var num = Math.floor((Math.random() * 1000) + 1)
        socket.emit('number', {number: num} ) 
    });
      
});
