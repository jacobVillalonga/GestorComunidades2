'use strict';

var Propietario = require('../models/propietario.model.js');

exports.list_all_propietarios = function(req, res) {
  Propietario.getAllPropietarios(function(err, propietarios) {
    if (err)
      res.send(err);
    // res.send(propietario);
    res.render('propietarios.ejs',{title: 'Gestor Comunidades',propietarios:propietarios})
  });
};
