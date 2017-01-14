// whenever you change a js file, such as app.js or the route files, you'll need to restart to see changes.

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');


var app = express();      //-+ This instatiates express, assigns our app variable to it...

//-=--------------------------------------------------------------------------------------------------This stuff tess app where to find views, engine to render with (jade), and some methods
// view engine setup
app.set('views', path.join(__dirname, 'views'));//-=--------------------------------------------Views rewrite url to top path \
app.set('view engine', 'jade');//-=-------------------------------------------------------------------------------------------------- use jade to render


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//-=--------------------------------------------Stattic pages from here (/public) but rewrite url to top path  

// New Code
// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;//-=--------------------------------------------Master app eports its app object to be called (core node)  
