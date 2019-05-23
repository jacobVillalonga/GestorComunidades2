'use strict';

var Comunidad = require('../models/comunidad.model.js');
var Incidencia = require('../models/incidencia.model.js');
var Vivienda = require('../models/vivienda.model.js');

exports.list_all_comunidades = function(req, res) {
  Comunidad.getAllComunidades(function(err, comunidades) {
    if (err)
      res.send(err);
    // res.send(comunidades);
    res.render('comunidades.ejs', {
      title: 'GestorComunidades/Comunidades',
      comunidades: comunidades
    })
  });
};

exports.insert_comunidad = function(req, res) {
  var comunidad = new Comunidad(req.body);
  //handles null error
  if (!comunidad.nombre_comunidad) {
    res.status(400).send({
      error: true,
      message: 'Please provide comunidad/nombre_comunidad'
    });
  } else {
    Comunidad.insert(comunidad, function(err, comunidad) {
      if (err)
        res.send(err);
      res.render('msg.ejs', {
        title: 'GestorComunidades/Guardar comunidad',
        message: 'Comunidad registrada'
      })
    });
  }
};

exports.update_comunidad = function(req, res) {
  Comunidad.update(req.body, function(err, comunidad) {
    if (err)
      res.send(err);
    res.render('msg.ejs', {
      title: 'GestorComunidades/Guardar comunidad',
      message: 'Comunidad actualizada'
    })
  });
};

exports.delete_comunidad = function(req, res) {
  Comunidad.delete(req.params.idComunidad, function(err, comunidad) {
    if (err)
      res.send(err);
    res.render('msg.ejs', {
      title: 'GestorComunidades/Eliminar comunidad',
      message: 'Comunidad eliminada'
    })
  });
};

exports.select_comunidad = function(req, res) {
  //crea una fecha para usarla como parametro por defecto para filtrar cuotas y deudas
  if (!req.params.year){
    req.params.year = new Date().getFullYear();
  }
  //obtiene la info de la comunidad
  Comunidad.getComunidadById(req.params.idComunidad, function(err, comunidad) {
    if (err)
      res.send(err);
    // res.json(comunidad);
    if (req.params.idComunidad == 0) {
      var nCom = {
        'nombre_comunidad': ''
      };
      res.render('edit-comunidad.ejs', {
        title: 'GestorComunidades/Añadir Comunidad',
        comunidad: nCom
      });
    } else {
    //obtiene las facturas de la comunidad
    Comunidad.getFacturasComunidad(req.params.idComunidad, function(err, facturas) {
      if (err)
        res.send(err);
      //obtiene las incidencias de la comunidad
      Incidencia.getIncidenciasComunidad(req.params.idComunidad, function(err, incidencias) {
        if (err)
          res.send(err);
        //obtiene todas las viviendas de la comunidad
        Comunidad.getViviendasTest(req.params.idComunidad, function(err, viviendas) {
          if (err)
            res.send(err);
          if (viviendas.length > 0) {
          //por cada vivienda...
          viviendas.forEach(function(vivienda, index, viviendas) {
            //obtiene la deuda anterior al año del parametro
            Vivienda.getDeudaAnterior(vivienda.id_vivienda, req.params.year, function(err, deuda) {
              if (err)
                res.send(err);
              vivienda.deuda_anterior = deuda;
              //obtiene la lista de los propietarios
              Vivienda.getPropietariosVivienda(vivienda.id_vivienda, function(err, propietarios) {
                if (err)
                  res.send(err);
                vivienda.propietarios = propietarios;
                Vivienda.getCuotasVivienda(vivienda.id_vivienda, req.params.year, function(err, cuotas) {
                  if (err)
                    res.send("Cuotas: ",vivienda.id_vivienda," ERR: ",err);
                  vivienda.cuotas = cuotas;
                  //si es la ultima vivienda, envia los datos
                  if (index + 1 == viviendas.length) {
                    comunidad.facturas = facturas;
                    comunidad.incidencias = incidencias;
                    comunidad.viviendas = viviendas;
                    res.render('edit-comunidad.ejs', {
                      title: 'GestorComunidades/Comunidad ' + comunidad.nombre_comunidad,
                      year: req.params.year,
                      comunidad: comunidad
                    })
                  }//end send
                });//end getCuotasVivienda
              });//end getPropietariosVivienda
            });//end getDeudaAnterior
          });//end forEach
        //revisar (duplicat)
        } else {
          comunidad.facturas = facturas;
          comunidad.incidencias = incidencias;
          comunidad.viviendas = viviendas;
          res.render('edit-comunidad.ejs', {
            title: 'GestorComunidades/Comunidad ' + comunidad.nombre_comunidad,
            year: req.params.year,
            comunidad: comunidad
          })
        }
        });//end getViviendasComunidad
      });//end getIncidenciasComunidad
    });//end getFacturasComunidad
    };
  });//end getComunidadById
};
var message = "";
