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
