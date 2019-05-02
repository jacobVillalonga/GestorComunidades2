'use strict';
module.exports = function(app) {
  var facturaController = require('../controllers/factura.controller');

  app.route('/facturas')
    .get(facturaController.list_all_facturas);
  //insert
  app.route('/facturas/:idFactura')
    .get(facturaController.select_factura)
    .post(function(req, res) {
      facturaController.update_factura(req, res);
    });
  //delete
};
