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

var AnimalSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    age: {type: Number, required: true, minlength: 5},
    species: {type: String, required: true, minlength: 2}
   })
   // Store the Schema under the name 'User'
mongoose.model('Animal', AnimalSchema);
var Animal = mongoose.model('Animal')

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
    Animal.find({},function(err,animals){
        if(err){
            console.log('Something went wrong trying to display animals.');  
        }
        res.render("index", {animals: animals});
    })
})
app.get('/animal/new', function(req, res) {
    res.render('new')    
})
app.post('/animal', function(req,res){
    var animal = new Animal({name: req.body.name, age: req.body.age, species: req.body.species});
    animal.save(function(err) {
        if(err) {
          console.log('something went wrong');
          console.log(err);
          for(var key in err.errors){
            req.flash('registration', err.errors[key].message);
            }
            res.redirect('/animal/new');
        } else { 
          res.redirect('/');
        }
      })
})
app.get('/animal/:id', function(req,res){
    Animal.findOne({_id: req.params.id},function(err,animal){
        if(err){
            console.log('Something went wrong trying to display animals.');  
        }
        res.render("single", {animal: animal});
    })
})
app.get('/edit/:id', function(req,res){
    Animal.findOne({_id: req.params.id},function(err,animal){
        if(err){
            console.log('Something went wrong trying to display animals.');  
        }
        res.render("edit", {animal: animal});
    })
})
app.post('/animal/:id', function(req,res){
    Animal.findOne({_id: req.params.id},function(err,animal){
        if(err){
            console.log('Something went wrong trying to display animals.');  
        }
        animal.name = req.body.name;
        animal.age = req.body.age;
        animal.species = req.body.species;
        animal.save(function(err){
            if(err) {
                console.log('something went wrong');
                console.log(err);
                for(var key in err.errors){
                  req.flash('registration', err.errors[key].message);
                  }
                  res.redirect(`/edit/${req.params.id}`);
              } else { 
                res.redirect(`/animal/${req.params.id}`);
              }
        })
    })
})

app.get('/delete/:id', function(req,res){
    Animal.remove({_id: req.params.id},function(err){
        if(err){
            console.log('Something went wrong trying to display animals.');  
        }
        res.redirect("/");
    })
})