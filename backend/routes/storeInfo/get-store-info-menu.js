
var express = require('express');
var router = express.Router();

var mysqlDB = require('../../mysql-db');

router.get('/', function (req, res, next) {

    var sql = `
    select menu_name, price
    from store s
    left join menu m
    on s.store_id = m.store_id
    where s.store_id = ?;`;

    var params = [];
    params.push(req.query.storeId);
    
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