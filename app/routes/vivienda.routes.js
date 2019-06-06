'use strict';
module.exports = function(app) {
  var viviendaController = require('../controllers/vivienda.controller');
  // viviendaController Routes

  app.get('/viviendas', viviendaController.list_all_viviendas);

  app.route('/comunidades/:idComunidad/viviendas')
    .post(function(req, res){
      viviendaController.insert_vivienda(req, res);
    });

  app.get('/comunidades/:idComunidad/viviendas/:idVivienda', viviendaController.select_vivienda);

  app.route('/viviendas/:idVivienda')
    .get(viviendaController.select_vivienda)
    .post(function(req, res){
        viviendaController.update_vivienda(req,res);
    });

  app.route('/viviendas/:idVivienda/year/:year')
    .get(viviendaController.select_vivienda);

  app.route('/vivienda/:idVivienda/propietarios')
    .get(viviendaController.prop_vivienda);

  app.route('/vivienda/:idVivienda/propietarios/:idPropietario/add')
    .get(viviendaController.add_prop_vivienda);

  app.route('/vivienda/:idVivienda/propietarios/:idPropietario/remove')
    .get(viviendaController.remove_prop_vivienda);

  app.route('/viviendaDel/delete/:idVivienda')
    .get(viviendaController.delete_vivienda);

};
