
var express = require('express');
var router = express.Router();

var mysqlDB = require('../../mysql-db');

router.post('/', function (req, res, next) {

    var sql = `insert into menu(store_id, category_group_code, menu_name, price, register_date)
                values(?, ?, ?, ?, now())`;
                
    var values = [];
    console.log(req.body.categoryGroupCode);
    values.push(req.body.storeId);
    values.push(req.body.categoryGroupCode);
    values.push(req.body.menuName);
    values.push(req.body.price);
    
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