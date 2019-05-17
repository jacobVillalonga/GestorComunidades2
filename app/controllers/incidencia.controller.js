'use strict';

var Incidencia = require('../models/incidencia.model.js');

exports.list_all_incidencias = function(req, res) {
  Incidencia.getAllIncidencias(function(err, incidencia) {
    if (err)
      res.send(err);
    res.send(incidencia);
  });
};

exports.insert_incidencia = function(req, res) {
  var incidencia = new Incidencia(req.body);
  //handles null error
  Incidencia.insert(incidencia, function(err, incidencia) {
    if (err)
      res.send(err);
    res.render('msg.ejs', {
      title: 'GestorComunidades/Añadir incidencia',
      message: 'Incidencia añadida'
    })
  })
};

exports.select_incidencia = function(req, res) {
  Incidencia.getIncidenciaById(req.params.idIncidencia, function(err, incidencia) {
    if (err)
      res.send(err);
    if (req.params.idIncidencia == 0) {
      var incidencia = {
        'comunidad_fk': req.params.idComunidad,
        'fecha': ''
      };
      res.render('edit-incidencia.ejs', {
        title: 'GestorComunidades/Añadir Incidencia',
        incidencia: incidencia
      });
    } else {
      res.render('edit-incidencia.ejs', {
        title: 'GestorComunidades/Editar Incidencia',
        incidencia: incidencia
        // viviendas: viviendas,
      })
    }
  })
};

exports.update_incidencia = function(req, res) {
  Incidencia.update(req.body, function(err, incidencia) {
    if (err)
      res.send(err);
    res.render('msg.ejs', {
      title: 'GestorComunidades/Actualizar incidencia',
      message: 'Incidencia actualizada'
    })
  });
};

exports.delete_incidencia = function(req, res) {
  Incidencia.delete(req.params.idIncidencia, function(err, incidencia) {
    if (err)
      res.send(err);
    res.render('msg.ejs', {
      title: 'GestorComunidades/Eliminar incidencia',
      message: 'Incidencia eliminada'
    })
  });
};
