'use strict';
module.exports = function(app) {
  var cuotaController = require('../controllers/cuota.controller');
  // cuotaController Routes

  app.route('/cuotas')
    .get(cuotaController.list_all_cuotas);
  //insert
  app.route('/cuotas/:idCuota')
    .get(cuotaController.select_cuota)
    .post(function(req, res) {
      cuotaController.update_cuota(req, res);
    });
  //delete
};
