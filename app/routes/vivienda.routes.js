'use strict';
module.exports = function(app) {
  var viviendaController = require('../controllers/vivienda.controller');
  // viviendaController Routes

  app.route('/viviendas')
    .get(viviendaController.list_all_viviendas);

  app.route('/viviendas/:idVivienda').get(viviendaController.select_vivienda);

  app.route('/viviendas/delete/:idVivienda').get(viviendaController.delete_vivienda);

};
