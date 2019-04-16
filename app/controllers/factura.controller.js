'use strict';

var Factura = require('../models/factura.model.js');

exports.list_all_facturas = function(req, res) {
  Factura.getAllFacturas(function(err, factura) {
    if (err)
      res.send(err);
    res.send(factura);
  });
};
