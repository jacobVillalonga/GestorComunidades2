'user strict';
var sql = require('../config/db.config.js');

//Comunidad object constructor
var Comunidad = function(comunidad) {
  this.nombre_comunidad = comunidad.nombre_comunidad;
  this.direccion = comunidad.direccion;
  this.cp = comunidad.cp;
  this.poblacion = comunidad.poblacion;
  this.provincia = comunidad.provincia;
};
Comunidad.createComunidad = function createComunidad(newComunidad, result) {
  sql.query("INSERT INTO comunidad set ?", newComunidad, function(err, res) {

    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Comunidad.getComunidadById = function getComunidad(comunidadId, result) {
  sql.query("Select * from comunidad where id_comunidad = ? ", comunidadId, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);

    }
  });
};
Comunidad.getViviendasComunidad = function getViviendas(comunidadId, result) {
  sql.query("Select * from vivienda where comunidad_fk = ? order by numero", comunidadId, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
Comunidad.getFacturasComunidad = function getFacturas(comunidadId, result) {
  sql.query("Select * from factura where comunidad_fk = ? order by fecha", comunidadId, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
Comunidad.getAllComunidades = function getAllComunidades(result) {
  sql.query("Select * from comunidad order by nombre_comunidad", function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log('comunidad : ', res);
      result(null, res);
    }
  });
};
Comunidad.updateById = function(id, comunidad, result) {
  sql.query("UPDATE comunidad SET nombre_comunidad = ? ," +
    " direccion = ? ," +
    " cp = ? ," +
    " poblacion = ? ," +
    " provincia = ? WHERE id_comunidad = ?",
    [comunidad.nombre_comunidad, comunidad.direccion, comunidad.cp, comunidad.poblacion, comunidad.provincia, id],
    function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
};
Comunidad.remove = function(id, result) {
  sql.query("DELETE FROM comunidad WHERE id_comunidad = ?", [id], function(err, res) {

    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {

      result(null, res);
    }
  });
};

module.exports = Comunidad;
