'use strict';
module.exports = function(app) {
  var viviendaController = require('../controllers/vivienda.controller');
  // viviendaController Routes

  app.route('/viviendas')
    .get(viviendaController.list_all_viviendas)
    ;
};
