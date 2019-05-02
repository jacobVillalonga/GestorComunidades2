'use strict';

var Factura = require('../models/factura.model.js');

exports.list_all_facturas = function(req, res) {
  Factura.getAllFacturas(function(err, factura) {
    if (err)
      res.send(err);
    res.send(factura);
  });
};

exports.select_factura = function(req, res) {
  Factura.getFacturaById(req.params.idFactura, function(err, factura) {
    if (err)
      res.send(err);
    if (req.params.idFactura == 0) {
      var factura = {
        'fecha': ''
      };
      res.render('edit-factura.ejs', {
        title: 'Añadir Factura',
        factura: factura
      });
    } else {
      res.render('edit-factura.ejs', {
        title: 'Editar Factura',
        factura: factura[0]
        // viviendas: viviendas,
      })
    }
  })
};
