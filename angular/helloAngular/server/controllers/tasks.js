const mongoose = require('mongoose'),
      Task = mongoose.model('Task')

module.exports = {
    tasks: function(req, res) {
        Task.find({}, function(err,tasks){
            if(err){
                res.json({err: true, error: err })
            }else{
                res.json({err: false, tasks: tasks})
            }
        })
    },
    task: function(req, res) {
        Task.findOne({_id: req.params.id}, function(err,task){
            if(err){
                res.json({err: true, error: err })
            }else{
                res.json({err: false, task: task})
            }
        })
    },
    new: function(req,res){
        var task = new Task({title: req.body.title, description: req.body.description, completed: req.body.completed});
        task.save(function(err) {
            if(err) {
                res.json({err: true, error: err })
            } else {
                res.json({err: false})
            }
          })
    },
    update: function(req,res){
        Task.findOne({_id: req.params.id},function(err,task){
            if(err){
                res.json({err: true, error: err })
            }else{
                task.title= req.body.title;
                task.description= req.body.description;
                task.completed= req.body.completed;
                task.save(function(err){
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
        Task.remove({_id: req.params.id},function(err){
            if(err) {
                res.json({err: true, error: err })
            } else {
                res.json({err: false})
            }
        })
    }
}