'user strict';

var mysql = require('mysql');
//var mysql = require('mysql');

//local mysql db connection
var env = mysql.createConnection({
    host     : 'localhost',
    user     : 'usuario',
    password : 'PassDAIS',
    database : 'comunidades_db'
});

env.connect(function(err) {
    if (err) throw err;
});

module.exports = env;
