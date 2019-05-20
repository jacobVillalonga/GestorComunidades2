'use strict';

var Vivienda = require('../models/vivienda.model.js');
var PropVivienda = require('../models/propVivienda.model.js');

exports.list_all_viviendas = function(req, res) {
  Vivienda.getAllViviendas(function(err, viviendas) {
    if (err)
      res.send(err);
    res.render('viviendas.ejs', {
      title: 'GestorComunidades',
      viviendas: viviendas
    });
    // res.send({title: "GestorComunidades",
    // viviendas:viviendas});
    });
};

exports.insert_vivienda = function(req, res) {
  var vivienda = new Vivienda(req.body);
  //handles null error
  if (!vivienda.numero) {
    res.status(400).send({
      error: true,
      message: 'Please provide vivienda/numero'
    });
  } else if (!vivienda.comunidad_fk) {
    res.status(400).send({
      error: true,
      message: 'Please provide vivienda/comunidad_fk'
    });
  } else {
    Vivienda.insert(vivienda, function(err, vivienda) {
      if (err)
        res.send(err);
      res.render('msg.ejs',{
        title: 'GestorComunidades/Guardar vivienda',
        message: 'Vivienda registrada'
      })
    });
  }
};

exports.select_vivienda = function(req, res) {
  if (!req.params.year){
    // var year =
    req.params.year = new Date().getFullYear();
  }
  Vivienda.getViviendaById(req.params.idVivienda, function(err, vivienda) {
    if (err)
      res.send(err);
    // res.json(vivienda);
    if (req.params.idComunidad) {
      var comunidad_fk = req.params.idComunidad;
  } else {
      var comunidad_fk = vivienda.comunidad_fk;
  }
    if (req.params.idVivienda == 0) {
      var vivienda = {
        'id_vivienda': 0,
        'numero': '',
        'comunidad_fk': comunidad_fk
      };
      res.render('edit-vivienda.ejs', {
        title: 'GestorComunidades/Añadir Vivienda',
        vivienda: vivienda,
        comunidad_fk: comunidad_fk
      });
    } else {
      Vivienda.getPropietariosVivienda(req.params.idVivienda, function(err, propietarios) {
        if (err)
          res.send(err);
        Vivienda.getCuotasVivienda(req.params.idVivienda, req.params.year, function(err, cuotas) {
          if (err)
            res.send(err);
            Vivienda.getDeudaAnterior(req.params.idVivienda, req.params.year, function(err, deuda) {
              if (err)
                res.send(err);
          res.render('edit-vivienda.ejs', {
            title: 'GestorComunidades/Edit Vivienda',
            vivienda: vivienda,
            comunidad_fk: comunidad_fk,
            propietarios: propietarios,
            cuotas: cuotas,
            deuda: deuda,
            year: req.params.year
            })
          })
        })
      });
    }
  });
};

exports.update_vivienda = function(req, res) {
  Vivienda.update(req.body, function(err, vivienda) {
    if (err)
      res.send(err);
    res.render('msg.ejs',{
      title: 'GestorComunidades/Guardar vivienda',
      message: 'Vivienda registrada'
    })
  });
};

exports.prop_vivienda = function(req, res) {
  Vivienda.getViviendaById(req.params.idVivienda, function(err, vivienda) {
    if (err)
      res.send(err);
    Vivienda.getPropietariosVivienda(req.params.idVivienda, function(err, propietarios) {
      if (err)
        res.send(err);
      Vivienda.getNoPropietarios(req.params.idVivienda, function(err, noPropietarios) {
        if (err)
          res.send(err);
        res.render('prop_vivienda.ejs', {
          title: 'GestorComunidades/Añadir propietario',
          vivienda: vivienda,
          propietarios: propietarios,
          noPropietarios: noPropietarios
        })
      })
    })
  })
}

exports.add_prop_vivienda = function(req, res) {
  var propVivienda = {
    id_vivienda: req.params.idVivienda,
    id_propietario: req.params.idPropietario
  }
  PropVivienda.addPropVivienda(propVivienda, function(err, propVivienda) {
    if (err)
      res.send(err);
    res.render('msg.ejs',{
      title: 'GestorComunidades/Asignar propietario',
      message: 'Propietario asignado'
    })
  })
}

exports.remove_prop_vivienda = function(req, res) {
  var propVivienda = {
    id_vivienda: req.params.idVivienda,
    id_propietario: req.params.idPropietario
  }
  PropVivienda.removePropVivienda(propVivienda, function(err, propVivienda) {
    if (err)
      res.send(err);
    res.render('msg.ejs',{
      title: 'GestorComunidades/Quitar propietario',
      message: 'Propietario reasignado'
    })
  })
}

exports.delete_vivienda = function(req, res) {
  Vivienda.delete(req.params.idVivienda, function(err, vivienda) {
    if (err)
      res.send(err);
    res.render('msg.ejs',{
      title: 'GestorComunidades/Eliminar vivienda',
      message: 'Vivienda eliminada'
    })
  });
};
