'use strict';

var Derrama = require('../models/derrama.model.js');

exports.list_all_derramas = function(req, res) {
  Derrama.getAllDerramas(function(err, derrama) {
    if (err)
      res.send(err);
    res.send(derrama);
  });
};

exports.select_derrama = function(req, res) {
  Derrama.getDerramaById(req.params.idDerrama, function(err, derrama) {
    if (err)
      res.send(err);
    if (req.params.idDerrama == 0) {
      var derrama = {
        'vivienda_fk':req.params.idVivienda
      };
      res.render('edit-derrama.ejs', {
        title: 'GestorComunidades/Añadir Derrama',
        derrama: derrama
      });
    } else {
      res.render('edit-derrama.ejs', {
        title: 'GestorComunidades/Editar Derrama',
        derrama: derrama
      })
    }
  })
};

exports.insert_derrama = function(req, res) {
  var derrama = req.body;
  //handles null error
  if (!derrama.importe || !derrama.fecha) {
    res.status(400).send({
      error: true,
      message: 'Please provide importe y fecha derrama'
    });
  } else if (!derrama.vivienda_fk) {
    res.status(400).send({
      error: true,
      message: 'Please provide vivienda_fk'
    });
  } else {
    Derrama.insert(derrama, function(err, derrama) {
      if (err)
        res.send(err);
      var url = "/viviendas/"+derrama.vivienda_fk;
      res.render('msg.ejs',{
        title: 'GestorComunidades/Guardar Derrama',
        message: 'Derrama registrada',
        url: url
      })
    });
  }
};

exports.update_derrama = function(req, res) {
    var url = "/viviendas/"+req.body.vivienda_fk;
  Derrama.update(req.body, function(err, derramaId) {
    if (err)
      res.send(err);
    res.render('msg.ejs',{
      title: 'GestorComunidades/Actualizar Derrama',
      message: 'Derrama actualizada',
      url: url})
  });
};

exports.delete_derrama = function(req, res) {
  Derrama.delete(req.params.idDerrama, function(err, derrama) {
    if (err)
      res.send(err);
    res.render('msg.ejs', {
      title: '',
      message: 'Derrama eliminada'
    })
  });
};
