
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'dasom',   
    password: 'Duddnjs12!',
    database: 'mukza'  
});

module.exports = connection;
