'use strict';
module.exports = function(app) {
  var comunidadController = require('../controllers/comunidad.controller');

  app.route('/comunidades')
    .get(comunidadController.list_all_comunidades)
    .post(function(req, res){
       comunidadController.insert_comunidad(req, res);
    });

  app.route('/comunidades/:idComunidad')
    .get(comunidadController.select_comunidad)
    .post(function(req, res){
        comunidadController.update_comunidad(req,res);
    });
  app.route('/comunidades/:idComunidad/year/:year')
    .get(comunidadController.select_comunidad);

  app.route('/comunidades/delete/:idComunidad')
    .get(comunidadController.delete_comunidad);

  app.route('/test/:idComunidad/year/:year').get(comunidadController.test);

};
