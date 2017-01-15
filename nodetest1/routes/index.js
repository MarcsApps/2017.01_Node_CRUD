// whenever you change a js file, such as app.js or the route files, you'll need to restart to see changes

var express = require('express');
var router = express.Router();

/* GET home page. */                              //  --------------clone this for other pages
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET hello World page. */                              //  --------------cloned
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'Hello, World!' });
});

/* GET medlog page. */         //---------------   loads medlogcollection into docs variable ! 
router.get('/medlog', function(req, res) {      // find all in collection, The GET setup
    var db = req.db;
    var collection = db.get('medlogcollection');
    collection.find({},{},function(e,docs){
        res.render('medlog', {
            "medlog" : docs
        });
    });
});
                                                   
                                                    
/* GET Add New med page. */                         //-----this is setup route for POST page
router.get('/addmed', function(req, res) {
    res.render('addmed', { title: 'Add New Med' });
});

/* POST to Add Med  Service */
router.post('/addmed', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes of form input
    var Med = req.body.Med;
    var Time = req.body.Time;
    var Date = req.body.Date;

    // Set our collection
    var collection = db.get('medlogcollection');

    // Submit to the DB
    collection.insert({
        "Med" : Med,
        "Date" : Date,
        "Time": Time
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("medlog");
        }
    });
});


module.exports = router;
