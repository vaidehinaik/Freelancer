var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
var session = require("express-session");
var MongoDBStore = require('connect-mongodb-session')(session);

// Routes
var users = require('./routes/users');

var app = express();

// Need to provide mongo db
var store = new MongoDBStore({
   uri: 'mongodb://localhost:27017/connect_mongodb_session',
   databaseName: 'mongoExpress',
   collection: 'userSessions'
});

// Catch errors
store.on('error', function(error) {
   assert.ifError(error);
   assert.ok(false);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var corsSettings = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsSettings));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: "This is a secret for fandango cmpe273 project",
    // Forces the session to be saved back to the session store,
    // even if the session was never modified during the request
    resave: true,
    //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    saveUninitialized: true,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: store
}));

app.use(passport.initialize());

app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
