const mongoose = require('mongoose'),
      Author = mongoose.model('Author')

module.exports = {
    authors: function(req, res) {
        Author.find({}, function(err,authors){
            if(err){
                res.json({err: true, error: err })
            }else{
                res.json({err: false, authors: authors})
            }
        })
    },
    author: function(req, res) {
        Author.findOne({_id: req.params.id}, function(err,author){
            if(err){
                res.json({err: true, error: err })
            }else{
                res.json({err: false, author: author})
            }
        })
    },
    new: function(req,res){
        var author = new Author({name: req.body.name});
        author.save(function(err,author) {
            if(err) {
                res.json({err: true, error: err })
            } else {
                res.json({err: false, author:author})
            }
          })
    },
    update: function(req,res){
        Author.findOne({_id: req.params.id},function(err,author){
            if(err){
                res.json({err: true, error: err })
            }else{
                author.name= req.body.name;
                author.save(function(err){
                    if(err){
                        res.json({err: true, error: err })
                    }else{
                        res.json({err: false})
                    }
                })
            }
        })
    },
    remove: function(req,res){
        Author.remove({_id: req.params.id},function(err){
            if(err) {
                res.json({err: true, error: err })
            } else {
                res.json({err: false})
            }
        })
    }
}