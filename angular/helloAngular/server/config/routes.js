const tasks = require('../controllers/tasks.js');

module.exports = function(app){

    app.get('/tasks', function(req, res) {
        tasks.tasks(req,res);
    })
    app.get('/tasks/:id', function(req,res){
        tasks.task(req,res);
    })
    app.post('/tasks', function(req, res) {
        tasks.new(req,res);
    })
    app.put('/tasks/update/:id', function(req,res){
        tasks.update(req,res);
    })
    app.delete('/tasks/delete/:id', function(req,res){
        tasks.remove(req,res);
    })
};