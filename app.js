var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var connection = require('./db/dbConnection');
const session = require('express-session');

// Obtain routes for views
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var mainAppRouter = require('./routes/mainApp');
var logoutRouter = require('./routes/logout');
var sessionRouter = require('./routes/session');
// initialize app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  req.db = connection;
  next();
});
app.use(session({
    secret: 'WETLNK12LNDFAJWEAksdQWERWESE_ERKNWERLAPAWEZZ',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/moment', express.static(path.join(__dirname, 'node_modules', 'moment', 'min')))

// set routing
app.use('/', indexRouter);
app.use('/app', loginRouter);
app.use('/dailyHub', mainAppRouter);
app.use('/logout', logoutRouter);
app.use('/setUsername',sessionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
