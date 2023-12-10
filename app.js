require('dotenv').config();
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');
let connection = require('./db/dbConnection');
const session = require('express-session');

// Obtain routes for views
let indexRouter = require('./routes/index');
let loginRouter = require('./routes/login');
let mainAppRouter = require('./routes/mainApp');
let logoutRouter = require('./routes/logout');
let sessionRouter = require('./routes/session');
// initialize app
let app1 = express();

// view engine setup
app1.set('views', path.join(__dirname, 'views'));
app1.set('view engine', 'ejs');

app1.use(logger('dev'));
app1.use(express.json());
app1.use(express.urlencoded({ extended: false }));
app1.use((req, res, next) => {
  req.db = connection;
  next();
});
app1.use(session({
    secret: 'WETLNK12LNDFAJWEAksdQWERWESE_ERKNWERLAPAWEZZ',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}));

app1.use(express.static(path.join(__dirname, 'public')));
app1.use('/moment', express.static(path.join(__dirname, 'node_modules', 'moment', 'min')))

// set routing
app1.use('/', indexRouter);
app1.use('/app', loginRouter);
app1.use('/dailyHub', mainAppRouter);
app1.use('/logout', logoutRouter);
app1.use('/setUsername',sessionRouter);

// catch 404 and forward to error handler
app1.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app1.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app1;
