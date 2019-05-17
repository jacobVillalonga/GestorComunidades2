'use strict';

var Cuota = require('../models/cuota.model.js');

exports.list_all_cuotas = function(req, res) {
  Cuota.getAllCuotas(function(err, cuota) {
    if (err)
      res.send(err);
    res.send(cuota);
  });
};

exports.select_cuota = function(req, res) {
  Cuota.getCuotaById(req.params.idCuota, function(err, cuota) {
    if (err)
      res.send(err);
    if (req.params.idCuota == 0) {
      var cuota = {
        'vivienda_fk':req.params.idVivienda
      };
      res.render('edit-cuota.ejs', {
        title: 'GestorComunidades/Añadir Cuota',
        cuota: cuota
      });
    } else {
      res.render('edit-cuota.ejs', {
        title: 'GestorComunidades/Editar Cuota',
        cuota: cuota
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
    Cuota.insert(cuota, function(err, cuota) {
      if (err)
        res.send(err);
      var url = "/viviendas/"+cuota.vivienda_fk;
      res.render('msg.ejs',{
        title: 'GestorComunidades/Guardar Cuota',
        message: 'Cuota registrada',
        url: url
      })
    });
  }
};

exports.update_cuota = function(req, res) {
    var url = "/viviendas/"+req.body.vivienda_fk;
  Cuota.update(req.body, function(err, cuotaId) {
    if (err)
      res.send(err);
    res.render('msg.ejs',{
      title: 'GestorComunidades/Actualizar Cuota',
      message: 'Cuota actualizada',
      url: url})
  });
};

exports.delete_cuota = function(req, res) {
  Cuota.delete(req.params.idCuota, function(err, cuota) {
    if (err)
      res.send(err);
    res.render('msg.ejs', {
      title: '',
      message: 'Cuota eliminada'
    })
  });
};
