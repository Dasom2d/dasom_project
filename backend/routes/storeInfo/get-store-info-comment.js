
var express = require('express');
var router = express.Router();

var mysqlDB = require('../../mysql-db');

router.get('/', function (req, res, next) {
    var sql = `
    select sa.store_appraise_id, sc.star_point, sc.comment
    from store_appraise sa
    inner join store_comment sc on sa.store_appraise_id = sc.store_appraise_id
    where sa.store_id = ?;`;
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