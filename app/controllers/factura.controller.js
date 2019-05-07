'use strict';

var Factura = require('../models/factura.model.js');

exports.list_all_facturas = function(req, res) {
  Factura.getAllFacturas(function(err, factura) {
    if (err)
      res.send(err);
    res.send(factura);
  });
};

exports.insert_factura = function(req, res) {
  var factura = new Factura(req.body);
  //handles null error
  Factura.insertFactura(factura, function(err, factura) {
    if (err)
      res.send(err);
      res.json(factura);
  })
};

exports.select_factura = function(req, res) {
  Factura.getFacturaById(req.params.idFactura, function(err, factura) {
    if (err)
      res.send(err);
    if (req.params.idFactura == 0) {
      var factura = {
        'comunidad_fk': req.params.idComunidad,
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

exports.update_factura = function(req, res) {
    console.log(req.body);
  Factura.updateFactura(req.body, function(err, factura) {
    if (err)
      res.send(err);
    res.json(factura);
  });
};

exports.delete_factura = function(req, res) {
  console.log("Eliminando factura ", req.params.idFactura);
  Factura.removeFactura(req.params.idFactura, function(err, factura) {
    if (err)
      res.send(err);
    res.render('msg.ejs', {
      title: '',
      message: 'Factura eliminada'
    })
  });
};
