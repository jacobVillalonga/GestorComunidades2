'use strict';
module.exports = function(app) {
  var incidenciaController = require('../controllers/incidencia.controller');

  app.route('/incidencias')
    .get(incidenciaController.list_all_incidencias)
    .post(function(req, res) {
      incidenciaController.insert_incidencia(req, res);
    });
  app.route('/comunidades/:idComunidad/incidencias/:idIncidencia')
    .get(incidenciaController.select_incidencia)
    .post(function(req, res) {
      incidenciaController.update_incidencia(req, res);
    });
  app.route('/incidencias/delete/:idIncidencia')
    .get(incidenciaController.delete_incidencia);
    //test
    app.route('/incidencias/:idIncidencia')
      .get(incidenciaController.test_incidencia);
};
