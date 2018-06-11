const mongoose = require('mongoose'),
      Quote = mongoose.model('Quote')

module.exports = function(app){

    app.get('/', function(req, res) {
        res.render("index");
    })
    app.get('/quotes', function(req, res) {
        Quote.find({},function(err,quotes){
            if(err){
                console.log('Something went wrong trying to display quotes.');
                console.log(err);
                res.redirect('/'); 
            }else{
                res.render("results", {quotes:quotes});
            }
        })
        
    })
    app.post('/new', function(req,res){
        var quote = new Quote({name: req.body.name, quote: req.body.quote});
        quote.save(function(err) {
            // if there is an error console.log that something went wrong!
            if(err) {
              console.log('something went wrong');
              console.log(err);
              for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
                }
                // redirect the user to an appropriate route
                res.redirect('/');
            } else { // else console.log that we did well and then redirect to the root route
              console.log('successfully added a quote!');
              res.redirect('/quotes');
            }
          })
    })
};