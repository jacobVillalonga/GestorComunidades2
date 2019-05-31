'use strict';
module.exports = function(app) {

  // var path = require('path');
  var viviendaController = require('../controllers/vivienda.controller');
  app.route('/')
    .get(function(req, res) {
      res.render('index.ejs', {
        title: 'Gestor Comunidades'
      })
    });

  app.get('/hi', function(req, res) {
    // res.sendFile(path.resolve('/public/index.html'));
    res.sendFile(__dirname+'/../public/index.html');
  });
};
