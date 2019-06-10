const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 3000;

var serveStatic = require('serve-static');
app.listen(port);

console.log('Gestor Comunidades iniciado, puerto: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public',express.static('app/public'));

app.set('views', './app/views');
app.set('view engine', 'ejs');
require('./app/routes/routes.js')(app);
