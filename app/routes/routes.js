'use strict';
module.exports = function(app) {
  var comunidadController = require('../controller/comunidadController');
  var viviendaController = require('../controller/viviendaController');

  // comunidadController Routes

  app.route('/comunidades')
    .get(comunidadController.list_all_comunidades)
    .post(function(req, res){
      comunidadController.insert_comunidad(req, res);
    });
;
   app.route('/comunidades/:idComunidad')
    .get(comunidadController.select_comunidad)
    .put(comunidadController.update_comunidad)
    .delete(comunidadController.delete_comunidad);

  // viviendaController Routes

  app.route('/viviendas')
    .get(viviendaController.list_all_viviendas)
    ;
};
