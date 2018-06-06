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
var log = [];

io.on('connection', function (socket) { //2
    socket.emit('initial',{log: log});
  
    socket.on('chat', function (data) { //7
        log.push([data.user,data.msg])
        io.emit('updated',{user: data.user,msg: data.msg});
    });
});