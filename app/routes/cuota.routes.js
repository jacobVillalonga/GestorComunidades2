'use strict';
module.exports = function(app) {
  var cuotaController = require('../controllers/cuota.controller');
  // cuotaController Routes

  app.route('/cuotas')
    .get(cuotaController.list_all_cuotas)
    .post(function(req, res) {
        cuotaController.insert_cuota(req, res);
      });

  app.route('/cuotas/:idCuota')
    .get(cuotaController.select_cuota)
    .post(function(req, res) {
      cuotaController.update_cuota(req, res);
    });
    // app.route('/comunidades/:idComunidad/facturas/:idFactura')
    //   .get(facturaController.select_factura)
    //   .post(function(req, res) {
    //     facturaController.update_factura(req, res);
    //   });
  app.route('/cuotas/delete/:idCuota')
    .get(cuotaController.delete_cuota);
};
