'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'usuario',
    password : 'PassDAIS',
    database : 'comunidades_dev'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
