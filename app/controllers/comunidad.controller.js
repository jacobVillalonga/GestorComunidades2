'use strict';

var Comunidad = require('../models/comunidad.model.js');

exports.list_all_comunidades = function(req, res) {
  Comunidad.getAllComunidades(function(err, comunidades) {
    if (err)
      res.send(err);
    // res.send(comunidades);
    if (comunidades.size > 1){console.log("OK--------------")};
    res.render('comunidades.ejs',{title: 'Comunidades',comunidades:comunidades})
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
    // res.json(comunidad);
    if (req.params.idComunidad == 0) {
      var comu = {'nombre_comunidad':''};
      res.render('edit-comunidad.ejs', {
        title: 'Añadir Comunidad',
        comunidad: comu
      });
    } else {
      Comunidad.getViviendasComunidad(req.params.idComunidad, function(err, viviendas) {
        if (err)
          res.send(err);
          Comunidad.getFacturasComunidad(req.params.idComunidad, function(err, facturas) {
            if (err)
              res.send(err);
            res.render('edit-comunidad.ejs', {
              title: 'Editar Comunidad',
              comunidad: comunidad[0],
              viviendas: viviendas,
              facturas: facturas
          })
        })
      });
    }
  });
};

exports.update_comunidad = function(req, res) {
    console.log(req.body);
  Comunidad.updateById(req.params.idComunidad, req.body, function(err, comunidad) {
    if (err)
      res.send(err);
    res.json(comunidad);
  });
};

exports.delete_comunidad = function(req, res) {
  console.log("Eliminando comunidad ",req.params.idComunidad);
  Comunidad.remove( req.params.idComunidad, function(err, comunidad) {
    if (err)
      res.send(err);
    res.render('deleted.ejs',{title: '', message: 'Comunidad eliminada'})
  });
};
