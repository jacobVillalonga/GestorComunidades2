'use strict';

var Vivienda = require('../models/vivienda.model.js');

exports.list_all_viviendas = function(req, res) {
  Vivienda.getAllViviendas(function(err, viviendas) {
    if (err)
      res.send(err);
    //console.log('res', vivienda);
    // res.send(vivienda);
    res.render('viviendas.ejs', {
      title: 'Gestor Comunidades',
      viviendas: viviendas
    })
  });
};

exports.insert_vivienda = function(req, res) {
  var vivienda = new Vivienda(req.body);
  //handles null error
  if (!vivienda.nombre_vivienda) {
    res.status(400).send({
      error: true,
      message: 'Please provide vivienda/numero'
    });
  } else {
    Vivienda.createVivienda(vivienda, function(err, vivienda) {
      if (err)
        res.send(err);
      res.json(vivienda);
    });
  }
};

exports.select_vivienda = function(req, res) {
  Vivienda.getViviendaById(req.params.idVivienda, function(err, vivienda) {
    if (err)
      res.send(err);
    // res.json(vivienda);
    res.render('edit-vivienda.ejs', {
      title: 'Edit Vivienda',
      vivienda: vivienda[0]
    })
  });
};

exports.update_vivienda = function(req, res) {
  Vivienda.updateById(req.params.idVivienda, new Vivienda(req.body), function(err, vivienda) {
    if (err)
      res.send(err);
    res.json(vivienda);
  });
};

exports.delete_vivienda = function(req, res) {
  console.log("Eliminando vivienda ", req.params.idVivienda);
  Vivienda.remove(req.params.idVivienda, function(err, vivienda) {
    if (err)
      res.send(err);
    // res.json({ message: 'Vivienda eliminada' });
    res.render('deleted.ejs', {
      title: '',
      message: 'Vivienda eliminada'
    })
  });
};
