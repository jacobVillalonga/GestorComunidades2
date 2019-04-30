'use strict';
module.exports = function(app) {
  var viviendaController = require('../controllers/vivienda.controller');
  // viviendaController Routes

  app.route('/viviendas')
    .get(viviendaController.list_all_viviendas)
    .post(function(req, res){
       viviendaController.insert_vivienda(req, res);
    });

  app.route('/viviendas/:idVivienda')
    .get(viviendaController.select_vivienda)
    .post(function(req, res){
        viviendaController.update_vivienda(req,res);
    });

  app.route('/viviendas/delete/:idVivienda').get(viviendaController.delete_vivienda);

};
