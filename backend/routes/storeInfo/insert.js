
var express = require('express');
var router = express.Router();

var mysqlDB = require('../../mysql-db');

router.post('/', function (req, res, next) {

    var sql = `insert into oneLine_comment(store_id, note, register_date)
                values(?, ?, now())`;
                
    var values = [];
    values.push(req.body.storeId);
    values.push(req.body.note);
    
    mysqlDB.query(sql, values, function (err, rows, fields) {
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