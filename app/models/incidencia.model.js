'user strict';
var sql = require('../config/db.config.js');

//object constructor
var Incidencia = function(cuota){
      this.info = cuota.info;
      this.comunidad_fk = cuota.comunidad_fk;
      this.fecha = cuota.fecha;
      this.emisor = cuota.emisor;
};

Incidencia.getAllIncidencias = function getAllIncidencias(result) {
  sql.query("Select * from incidencia order by fecha", function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log('incidencia : ', res);
      result(null, res);
    }
  });
};
Incidencia.getIncidenciaById = function getIncidencia(incidenciaId, result) {
  sql.query("Select i.*, c.nombre_comunidad from incidencia i join comunidad c on c.id_comunidad = i.comunidad_fk where id_incidencia = ? ", incidenciaId, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
Incidencia.insertIncidencia = function insertIncidencia(incidencia, result) {
  sql.query("INSERT INTO incidencia set ?", incidencia, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};
Incidencia.updateIncidencia = function updateIncidencia(incidencia, result) {
  sql.query("UPDATE incidencia SET info = ?, fecha = ?, emisor = ? WHERE id_incidencia = ?",
    [incidencia.info, incidencia.fecha, incidencia.emisor, incidencia.id_incidencia],
    function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
};
Incidencia.removeIncidencia = function(id, result) {
  sql.query("DELETE FROM incidencia WHERE id_incidencia = ?", [id], function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
Incidencia.getIncidenciasComunidad = function getIncidencias(comunidadId, result) {
  sql.query("Select * from incidencia where comunidad_fk = ? order by fecha", comunidadId, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
module.exports = Incidencia;
