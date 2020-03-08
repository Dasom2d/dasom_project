var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// get movie router
const moviesRouter = require('./routes/movie');
var mysqlDB = require('./mysql-db');
mysqlDB.connect();

var categoryRouter = require('./routes/category');
var getStoreIdRouter = require('./routes/storeInfo/get-store-id');
var getStoreInfoRouter = require('./routes/storeInfo/get-store-info');

var app = express();
app.use(cors());

app.use(require('connect-history-api-fallback')());
app.use('/api/movies', moviesRouter);
app.use('/api/category', categoryRouter);
app.use('/api/storeInfo/getStoreId', getStoreIdRouter);
app.use('/api/storeInfo/getStoreInfo', getStoreInfoRouter);

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




module.exports = app;
