'use strict';

var Vivienda = require('../models/viviendaModel.js');

exports.list_all_viviendas = function(req, res) {
  Vivienda.getAllViviendas(function(err, vivienda) {
    if (err)
      res.send(err);
      //console.log('res', comunidad);
    res.send(vivienda);
  });
};
