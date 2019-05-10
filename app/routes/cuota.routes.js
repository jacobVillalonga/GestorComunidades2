'use strict';
module.exports = function(app) {
  var cuotaController = require('../controllers/cuota.controller');
  // cuotaController Routes

  app.route('/cuotas')
    .get(cuotaController.list_all_cuotas)
    .post(function(req, res) {
        cuotaController.insert_cuota(req, res);
      });

  app.route('/viviendas/:idVivienda/cuotas/:idCuota')
    .get(cuotaController.select_cuota)
    .post(function(req, res) {
      cuotaController.update_cuota(req, res);
    });

  app.route('/cuotas/delete/:idCuota')
    .get(cuotaController.delete_cuota);
};
