'use strict';

var Cuota = require('../models/cuota.model.js');

exports.list_all_cuotas = function(req, res) {
  Cuota.getAllCuotas(function(err, cuota) {
    if (err)
      res.send(err);
      //console.log('res', cuota);
    res.send(cuota);
  });
};

exports.select_cuota = function(req, res) {
  Cuota.getCuotaById(req.params.idCuota, function(err, cuota) {
    if (err)
      res.send(err);
    if (req.params.idCuota == 0) {
      var cuota = {
        'fecha': ''
      };
      res.render('edit-cuota.ejs', {
        title: 'Añadir Cuota',
        cuota: cuota
      });
    } else {
      res.render('edit-cuota.ejs', {
        title: 'Editar Cuota',
        cuota: cuota[0]
      })
    }
  })
};

exports.insert_cuota = function(req, res) {
  var cuota = req.body;
  //handles null error
  if (!cuota.importe || !cuota.fecha) {
    res.status(400).send({
      error: true,
      message: 'Please provide importe y fecha cuota'
    });
  } else if (!cuota.vivienda_fk) {
    res.status(400).send({
      error: true,
      message: 'Please provide vivienda_fk'
    });
  } else {
    Cuota.insertCuota(cuota, function(err, cuota) {
      if (err)
        res.send(err);
      res.json(cuota);
    });
  }
};

exports.update_cuota = function(req, res) {
    console.log(req.body);
  Cuota.updateCuota(req.body, function(err, cuotaId) {
    if (err)
      res.send(err);
    res.json(cuotaId);
  });
};

exports.delete_cuota = function(req, res) {
  console.log("Eliminando cuota ", req.params.idCuota);
  Cuota.removeCuota(req.params.idCuota, function(err, cuota) {
    if (err)
      res.send(err);
    res.render('msg.ejs', {
      title: '',
      message: 'Cuota eliminada'
    })
  });
};
