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
