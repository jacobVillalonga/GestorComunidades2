'use strict';

var Propietario = require('../models/propietario.model.js');

exports.list_all_propietarios = function(req, res) {
  Propietario.getAllPropietarios(function(err, propietarios) {
    if (err)
      res.send(err);
    res.render('propietarios.ejs', {
      title: 'Gestor Comunidades',
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
        title: 'Añadir Propietario',
        propietario: propietario
      });
    } else {
      Propietario.getViviendasPropietario(req.params.idPropietario, function(err, viviendas) {
        if (err)
          res.send(err);
        res.render('edit-propietario.ejs', {
          title: 'Editar Propietario',
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
    Propietario.createPropietario(propietario, function(err, propietario) {
      if (err)
        res.send(err);
      res.render('msg.ejs',{title: 'Guardar Propietario', message: 'Propietario registrado'})
    });
  }
};

exports.update_propietario = function(req, res) {
  console.log(req.body);
  Propietario.updateById(req.body, function(err, propietario) {
    if (err)
      res.send(err);
    res.render('msg.ejs',{title: 'Guardar propietario', message: 'Propietario actualizado'})
  });
};

exports.delete_propietario = function(req, res) {
  console.log("Eliminando propietario ", req.params.idPropietario);
  Propietario.remove(req.params.idPropietario, function(err, propietario) {
    if (err)
      res.send(err);
    res.render('msg.ejs',{title: 'Eliminar propietario', message: 'Propietario eliminado'})
  });
};
