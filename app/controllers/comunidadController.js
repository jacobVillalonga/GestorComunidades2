'use strict';

var Comunidad = require('../models/comunidadModel.js');

exports.list_all_comunidades = function(req, res) {
  Comunidad.getAllComunidades(function(err, comunidad) {
    if (err)
      res.send(err);
      // console.log('res: ', comunidad);
      // console.log('-------res---------', res);
    res.send(comunidad);
  });
};
exports.insert_comunidad = function(req, res) {
  var comunidad = new Comunidad(req.body);
  //handles null error
  if(!comunidad.nombre_comunidad){
    res.status(400).send({ error:true, message: 'Please provide comunidad/nombre_comunidad' });
  }else{
    Comunidad.createComunidad(comunidad, function(err, comunidad) {
      if (err)
        res.send(err);
      res.json(comunidad);
    });
  }
};

exports.select_comunidad = function(req, res) {
    Comunidad.getComunidadById(req.params.idComunidad, function(err, comunidad) {
      if (err)
        res.send(err);
      res.json(comunidad);
    });
  };

exports.update_comunidad = function(req, res) {
  Comunidad.updateById(req.params.idComunidad, new Comunidad(req.body), function(err, comunidad) {
    if (err)
      res.send(err);
    res.json(comunidad);
  });
};

exports.delete_comunidad = function(req, res) {
  Comunidad.remove( req.params.idComunidad, function(err, comunidad) {
    if (err)
      res.send(err);
    res.json({ message: 'Comunidad eliminada' });
  });
};
