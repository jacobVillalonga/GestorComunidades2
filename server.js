const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 3000;


const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'usuario',
    password: 'PassDAIS',
    database: 'comunidades_db'
});

// connect to database
mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', './app/views');
app.set('view engine', 'ejs');

var routes = require('./app/routes/routes'); //importing route
routes(app); //register the route
