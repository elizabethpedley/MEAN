const authors = require('../controllers/authors.js');
const path = require("path");

module.exports = function(app){

    app.get('/api/authors', function(req, res) {
        authors.authors(req,res);
    })
    app.get('/api/authors/:id', function(req,res){
        authors.author(req,res);
    })
    app.post('/api/authors', function(req, res) {
        authors.new(req,res);
    })
    app.put('/api/authors/update/:id', function(req,res){
        authors.update(req,res);
    })
    app.delete('/api/authors/delete/:id', function(req,res){
        authors.remove(req,res);
    })
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
};