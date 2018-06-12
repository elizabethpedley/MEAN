const mongoose = require('mongoose'),
      Person = mongoose.model('Person')

module.exports = {
    index: function(req, res) {
        Person.find({}, function(err,people){
            if(err){
                res.json({err: true, error: err })
            }else{
                res.json({err: false, people: people})
            }
        })
    },
    new: function(req,res){
        var person = new Person({name: req.params.name});
        person.save(function(err) {
            if(err) {
                res.json({err: true, error: err })
            } else {
                res.json({err: false})
            }
          })
    },
    person: function(req,res){
        Person.findOne({name: req.params.name},function(err,person){
            if(err){
                res.json({err: true, error: err })
            }else{
                res.json({err: false, person: person})
            }
        })
    },
    remove: function(req,res){
        Person.remove({name: req.params.name},function(err){
            if(err) {
                res.json({err: true, error: err })
            } else {
                res.json({err: false})
            }
        })
    }
}