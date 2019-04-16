'use strict';
module.exports = function(app) {
  var facturaController = require('../controllers/factura.controller');
  // facturaController Routes

  app.route('/facturas')
    .get(facturaController.list_all_facturas)
    ;
};
