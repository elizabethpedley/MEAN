var express = require("express");
var path = require("path");
// create the express app
var app = express();
const server = app.listen(1337);
const io = require('socket.io')(server);
// static content
app.use(express.static(path.join(__dirname, "./static")));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
    res.render("index");
})
var counter=0;
io.on('connection', function (socket) { //2
    console.log('in connection')
  
    socket.on('push', function (data) { //7
        counter += 1;
        socket.emit('updated',{number: counter});
    });
    socket.on('reset', function (data) { //7
        counter = 0;
        socket.emit('updated',{number: counter});
    });
      
});
