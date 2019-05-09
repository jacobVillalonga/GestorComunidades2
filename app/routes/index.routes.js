'use strict';
module.exports = function(app) {

    var viviendaController = require('../controllers/vivienda.controller');
  app.route('/')
    .get(function(req, res) {
      res.render('index.ejs', {
        title: 'Gestor Comunidades'
      })
    });
    app.get('/hi', viviendaController.list_all_viviendas);

      app.get('/hi', function(req, res) {
        viviendaController.list_all_viviendas;
        	res.sendFile(path.resolve('app/public/index.html'));
      });
        // app.get('/hi', function(req, res) {
        //   var viviendas = viviendaController.list_all_viviendas;
        //   console.log(viviendas.title);
        //   console.log("ok");
        // 	res.sendFile(path.resolve('app/public/index.html'));
        // });
};
