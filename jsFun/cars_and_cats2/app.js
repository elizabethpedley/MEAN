var express = require("express");
var app = express();

app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get('/cars', function(request, response) {
    console.log('here');
    response.render('cars');
    });
app.get('/cats', function(request, response) {
    response.render('cats');
});
app.get('/new', function(request, response) {
    response.render('new');
});
app.get('/cats/0', function(request, response) {
    var cat = {
        name: 'Missy',
        age: 6,
        favoriteSpots: ['boxes','outside', 'top of cabinets']
    }
    response.render('single', {cat: cat});
});
app.get('/cats/1', function(request, response) {
    var cat = {
        name: 'Josie',
        age: 2,
        favoriteSpots: ['boxes','outside', 'top of cabinets']
    }
    response.render('single', {cat: cat});
});

// tell your server which port to run on
app.listen(8000, function() {
    console.log("listening on port 8000");
  })