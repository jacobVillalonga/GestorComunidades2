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
  Incidencia.insertIncidencia(incidencia, function(err, incidencia) {
    if (err)
      res.send(err);
    res.render('msg.ejs', {
      title: 'Añadir incidencia',
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
        title: 'Añadir Incidencia',
        incidencia: incidencia
      });
    } else {
      res.render('edit-incidencia.ejs', {
        title: 'Editar Incidencia',
        incidencia: incidencia[0]
        // viviendas: viviendas,
      })
    }
  })
};

exports.update_incidencia = function(req, res) {
    console.log(req.body);
  Incidencia.updateIncidencia(req.body, function(err, incidencia) {
    if (err)
      res.send(err);
    res.render('msg.ejs', {
      title: 'Actualizar incidencia',
      message: 'Incidencia actualizada'
    })
  });
};

exports.delete_incidencia = function(req, res) {
  console.log("Eliminando incidencia ", req.params.idIncidencia);
  Incidencia.removeIncidencia(req.params.idIncidencia, function(err, incidencia) {
    if (err)
      res.send(err);
    res.render('msg.ejs', {
      title: 'Eliminar incidencia',
      message: 'Incidencia eliminada'
    })
  });
};
