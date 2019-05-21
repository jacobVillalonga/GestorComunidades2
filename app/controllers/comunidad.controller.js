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

exports.select_comunidad = function(req, res) {
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
      Comunidad.getViviendasComunidad(req.params.idComunidad, function(err, viviendas) {
        if (err)
          res.send(err);
        Comunidad.getFacturasComunidad(req.params.idComunidad, function(err, facturas) {
          if (err)
            res.send(err);
          Incidencia.getIncidenciasComunidad(req.params.idComunidad, function(err, incidencias) {
            if (err)
              res.send(err);
            res.render('edit-comunidad.ejs', {
              title: 'GestorComunidades/Comunidad ' + comunidad.nombre_comunidad,
              comunidad: comunidad,
              viviendas: viviendas,
              facturas: facturas,
              incidencias: incidencias
            })
          })
        })
      });
    }
  });
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

exports.provaComu = function(req, res) {
  //obtiene la info de la comunidad
  Comunidad.getComunidadById(req.params.idComunidad, function(err, comunidad) {
    if (err)
      res.send(err);
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

            //     viviendas.forEach(function (vivienda, index, viviendas) {
            //new Promise((resolve, reject) => {
              // viviendasFull[index]=vivienda;
              // resolve(viviendasFull);
          // })
        // })
          Promise.all([
            new Promise((resolve, reject) => {
                setTimeout(() => {
                  var viv = viviendas[0];
                  viv.deuda = 0;
                  console.log("-----------",viv);
                    viviendas[3]=viv;
                    resolve(viviendas);
                }, 2000)
            // }),
            // new Promise((resolve, reject) => {
            //   setTimeout(() => {
            //     viviendas.forEach(function (vivienda, index, viviendas) {
            //       Vivienda.getDeudaAnterior(vivienda.id_vivienda, 2019, function(err, deuda) {
            //         if (err)
            //           res.send(err);
            //         vivienda.deuda_anterior = deuda;
            //       });
            //       Vivienda.getPropietariosVivienda(vivienda.id_vivienda, function(err, propietarios) {
            //         if (err)
            //           res.send(err);
            //         vivienda.propietarios= propietarios;
            //         console.log(vivienda);
            //       })
            //     });
            //     resolve(viviendas);
            //   }, 2000)
            // }),
            // Comunidad.getViviendasTest(req.params.idComunidad, function(err, viviendas) {
            //   console.log("comunidad: ", comunidad);
            //   if (err)
            //     res.send(err);
            //   comunidad.viviendas = viviendas;
            })
          ]).then((results) => {
            console.log("Results = ", results, "message = ", message);
            comunidad.viviendas = viviendas;
            res.send({
              comunidad: comunidad
            });
          });
          comunidad.facturas = facturas;
          comunidad.incidencias = incidencias;
        });
      });
    });
  })
};
var message = "";
