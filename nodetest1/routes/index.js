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


module.exports = router;
