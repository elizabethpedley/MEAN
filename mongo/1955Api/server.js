var express = require("express");
var path = require("path");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
const flash = require('express-flash');
require('./server/config/mongoose.js');
// require('./server/models/quotes.js');
var app = express();
app.use(bodyParser.json());
const server = app.listen(1337);
app.use(flash());
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
require('./server/config/routes.js')(app)