
var express = require('express');
var router = express.Router();

var mysqlDB = require('../mysql-db');

router.get('/', function (req, res, next) {
    var sql = 'select * from category';
 //   var params = ['PK6'];
    mysqlDB.query(sql, function (err, rows, fields) {
        if (!err) {
            console.log(rows);
          //  res.send(result);
            res.send(rows);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
});

module.exports = router;