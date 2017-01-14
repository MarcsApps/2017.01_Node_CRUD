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

/* GET medlog page. */
router.get('/medlog', function(req, res) {
    var db = req.db;
    var collection = db.get('medlogcollection');
    collection.find({},{},function(e,docs){
        res.render('medlog', {
            "medlog" : docs
        });
    });
});
                                                    //--------------- loads medlogcollection into docs variable ! 
                                                    // find all in collection, 

module.exports = router;
