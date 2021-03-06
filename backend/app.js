var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

// get movie router
const moviesRouter = require('./routes/movie');
var mysqlDB = require('./mysql-db');
mysqlDB.connect();

var categoryRouter = require('./routes/category');
var getStoreIdRouter = require('./routes/storeInfo/get-store-id');
var getStoreMenuInfoRouter = require('./routes/storeInfo/get-store-info-menu');
var getStoreSpecialNoteInfoRouter = require('./routes/storeInfo/get-store-info-special-note');
var insertSpecialNoteRouter = require('./routes/storeInfo/insert-special-note');
var insertMenuRouter = require('./routes/storeInfo/insert-menu');

var app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(require('connect-history-api-fallback')());
app.use('/api/movies', moviesRouter);
app.use('/api/category', categoryRouter);
app.use('/api/storeInfo/getStoreId', getStoreIdRouter);
app.use('/api/storeInfo/getStoreMenuInfo', getStoreMenuInfoRouter);
app.use('/api/storeInfo/getStoreSpecialNoteInfo', getStoreSpecialNoteInfoRouter);
app.use('/api/storeInfo/insertSpecialNote', insertSpecialNoteRouter);
app.use('/api/storeInfo/insertMenu', insertMenuRouter);

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
