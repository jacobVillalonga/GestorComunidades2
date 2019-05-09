const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 3000;
  path = require("path");

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
require('./app/routes/index.routes')(app);
require('./app/routes/comunidad.routes')(app); //importing route
require('./app/routes/vivienda.routes')(app);
require('./app/routes/propietario.routes')(app);
require('./app/routes/factura.routes')(app);
require('./app/routes/cuota.routes')(app);
// routes(app); //register the route
