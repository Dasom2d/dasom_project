var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// get movie router
const moviesRouter = require('./routes/movie');

var mysql = require('mysql');

var app = express();

app.use(require('connect-history-api-fallback')());
app.use('/api/movies', moviesRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// use middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Connection 객체 생성 
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'dasom',   
    password: 'Duddnjs12!',
    database: 'mukza'  
  });  
  connection.connect()


module.exports = app;
