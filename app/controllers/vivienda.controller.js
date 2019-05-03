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
  if (!vivienda.numero) {
    res.status(400).send({
      error: true,
      message: 'Please provide vivienda/numero'
    });
  } else if (!vivienda.comunidad_fk) {
    res.status(400).send({
      error: true,
      message: 'Please provide vivienda/comunidad_fk'
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
    if (req.params.idComunidad) {
      var comunidad_fk = req.params.idComunidad;
    } else {
      res.status(400).send({
        error: true,
        message: 'Please provide comunidad/comunidad_fk'
      });
    }
    if (req.params.idVivienda == 0) {
      console.log("Hey!")
      var vivienda = {
        'id_vivienda': 0,
        'numero': ''
      };
      res.render('edit-vivienda.ejs', {
        title: 'Añadir Vivienda',
        vivienda: vivienda,
        comunidad_fk: comunidad_fk
      });
    } else {
      Vivienda.getPropietariosVivienda(req.params.idVivienda, function(err, propietarios) {
        if (err)
          res.send(err);
        Vivienda.getCuotasVivienda(req.params.idVivienda, function(err, cuotas) {
          if (err)
            res.send(err);
          res.render('edit-vivienda.ejs', {
            title: 'Edit Vivienda',
            vivienda: vivienda[0],
            comunidad_fk: comunidad_fk,
            propietarios: propietarios,
            cuotas: cuotas
          })
        })
      });
    }
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
