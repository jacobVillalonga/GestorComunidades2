'use strict';
module.exports = function(app) {

  var path = require('path');
  var comunidadController = require('../controllers/comunidad.controller');
  // app.route('/')
  //   .get(function(req, res) {
  //     res.render('index.ejs', {
  //       title: 'Gestor Comunidades'
  //     })
  //   });

  app.route('/')
    .get(comunidadController.list_all_comunidades);

  app.get('/hi', function(req, res) {
    res.sendFile(path.resolve('app/public/index.html'));
  });
};
