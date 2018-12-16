var express = require('express');
//var cookieSession = require('cookie-session')
//var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//setting default env to dev
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require(`./config/${process.env.NODE_ENV}`);

var router = require('./router');
var srouter = require('./secureRouter');

var app = express();
var passport = require('./config/passport');
var db = require('./config/db')(config.db);

var cors = require('cors');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
app.use(cors());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
/*app.use(cookieSession({
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))*/

app.use('/api', passport.authenticate('jwt', { session : false }), srouter);
app.use('/', router);

// catch 404 and forward to error handler
//app.use(express.static(path.join(__dirname, 'public')));

/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;
