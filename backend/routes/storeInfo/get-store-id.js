
var express = require('express');
var router = express.Router();

var mysqlDB = require('../../mysql-db');

router.get('/', function (req, res, next) {
    console.log('req.params = '+req.query.store_id);


    var sql = 'select store_id from store where store_daum_id = ?';
    var params = [];
    params.push(req.query.storeDaumId);
    
    mysqlDB.query(sql, params, function (err, rows, fields) {
        if (!err) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
});

module.exports = router;