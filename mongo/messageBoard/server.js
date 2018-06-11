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
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/messageDojo');

var CommentSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    comment: {type: String, required: true, minlength: 5}
}, {timestamp: true})

var PostSchema = new mongoose.Schema({
name: {type: String, required: true, minlength: 2},
post: {type: String, required: true, minlength: 5},
comments: [CommentSchema]
}, {timestamp: true})

mongoose.model('Comment', CommentSchema);
mongoose.model('Post', PostSchema);
var Comment = mongoose.model('Comment')
var Post = mongoose.model('Post')



app.get('/', function(req, res) {
    Post.find({},function(err,posts){
        if(err){
            console.log('Something went wrong trying to get posts.');  
            console.log(err)
        }
        res.render("index", {posts: posts});
    })
})
app.post('/new', function(req, res){
    var post = new Post({name: req.body.name,post: req.body.post});
    post.save(function(err){
        if(err) {
            console.log('something went wrong');
            console.log(err);
          }
          res.redirect('/') 
    })
})
app.post('/new/:id', function(req, res){
    Comment.create({name:req.body.name,comment: req.body.comment}, function(err,comment){
        if(err){
            console.log('error creating comment');
            console.log(err);
        
        }else{
            Post.findOneAndUpdate({_id: req.params.id}, {$push: {comments: comment}}, function(err, data){
                if(err){
                    console.log('error adding comment to post');
                    console.log(err);
                }
           })
        }
        res.redirect('/')
    })
})

