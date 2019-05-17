'use strict';

var Propietario = require('../models/propietario.model.js');

exports.list_all_propietarios = function(req, res) {
  Propietario.getAllPropietarios(function(err, propietarios) {
    if (err)
      res.send(err);
    res.render('propietarios.ejs', {
      title: 'GestorComunidades',
      propietarios: propietarios
    })
  });
};

exports.select_propietario = function(req, res) {
  Propietario.getPropietarioById(req.params.idPropietario, function(err, propietario) {
    if (err)
      res.send(err);
    if (req.params.idPropietario == 0) {
      var propietario = {
        'nombre': ''
      };
      res.render('edit-propietario.ejs', {
        title: 'GestorComunidades/Añadir Propietario',
        propietario: propietario
      });
    } else {
      Propietario.getViviendasPropietario(req.params.idPropietario, function(err, viviendas) {
        if (err)
          res.send(err);
        res.render('edit-propietario.ejs', {
          title: 'GestorComunidades/Editar Propietario',
          propietario: propietario,
          viviendas: viviendas
        })
      })
    }
  })
};

exports.insert_propietario = function(req, res) {
  var propietario = new Propietario(req.body);
  //handles null error
  if (!propietario.nombre) {
    res.status(400).send({
      error: true,
      message: 'Please provide propietario/nombre'
    });
  } else {
    Propietario.insert(propietario, function(err, propietario) {
      if (err)
        res.send(err);
      res.render('msg.ejs',{
        title: 'GestorComunidades/Guardar Propietario',
        message: 'Propietario registrado'
      })
    });
  }
};

exports.update_propietario = function(req, res) {
  Propietario.update(req.body, function(err, propietario) {
    if (err)
      res.send(err);
    res.render('msg.ejs',{
      title: 'GestorComunidades/Guardar propietario',
      message: 'Propietario actualizado'
    })
  });
};

exports.delete_propietario = function(req, res) {
  Propietario.delete(req.params.idPropietario, function(err, propietario) {
    if (err)
      res.send(err);
    res.render('msg.ejs',{
      title: 'GestorComunidades/Eliminar propietario',
      message: 'Propietario eliminado'
    })
  });
};
