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
  Factura.insert(factura, function(err, factura) {
    if (err)
      res.send(err);
    res.render('msg.ejs', {
      title: 'GestorComunidades/Añadir factura',
      message: 'Factura añadida'
    })
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
        title: 'GestorComunidades/Añadir Factura',
        factura: factura
      });
    } else {
      res.render('edit-factura.ejs', {
        title: 'GestorComunidades/Editar Factura',
        factura: factura
        // viviendas: viviendas,
      })
    }
  })
};

exports.update_factura = function(req, res) {
  Factura.update(req.body, function(err, factura) {
    if (err)
      res.send(err);
    res.render('msg.ejs', {
      title: 'GestorComunidades/Actualizar factura',
      message: 'Factura actualizada'
    })
  });
};

exports.delete_factura = function(req, res) {
  Factura.delete(req.params.idFactura, function(err, factura) {
    if (err)
      res.send(err);
    res.render('msg.ejs', {
      title: 'GestorComunidades/Eliminar factura',
      message: 'Factura eliminada'
    })
  });
};
