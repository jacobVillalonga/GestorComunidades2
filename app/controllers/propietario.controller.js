'use strict';

var Propietario = require('../models/propietario.model.js');

exports.list_all_propietarios = function(req, res) {
  Propietario.getAllPropietarios(function(err, propietario) {
    if (err)
      res.send(err);
    res.send(propietario);
  });
};
