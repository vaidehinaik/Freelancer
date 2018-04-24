var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var MemoryStore = require('memorystore')(expressSession);
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var projects = require('./routes/projects');
var projectBid = require('./routes/projectBid');

var app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//Enable CORS
var corSettings = {
  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corSettings));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(expressSession({secret: 'freelancer', saveUninitialized: false, resave: false}));
app.use(expressSession({
  store: new MemoryStore({
    checkPeriod: 86400000
  }),
  secret: 'freelancer',
  saveUninitialized: false,
  resave: false
}));

const staticFiles = express.static(path.join(__dirname, '../client_react_redux/build'));
app.use(staticFiles);

app.use('/', index);
app.use('/users', users);
app.use('/projects', projects);
app.use('/projectBid', projectBid);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use('/*', staticFiles);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});

module.exports = app;