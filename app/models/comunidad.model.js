'user strict';
var sql = require('../config/db.config.js');
var Vivienda = require('./vivienda.model.js');
//Comunidad object constructor
var Comunidad = function(comunidad) {
  this.nombre_comunidad = comunidad.nombre_comunidad;
  this.direccion = comunidad.direccion;
  this.cp = comunidad.cp;
  this.poblacion = comunidad.poblacion;
  this.provincia = comunidad.provincia;
};
Comunidad.insert = function (newComunidad, result) {
  sql.query("INSERT INTO comunidad set ?", newComunidad, function(err, res) {

    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("insert comunidad: ", newComunidad);
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
      console.log("get comunidad: "+comunidadId, res)
      result(null, res[0]);
    }
  });
};
Comunidad.getViviendasComunidad = function getViviendas(comunidadId, result) {
  // sql.query("Select * from vivienda where comunidad_fk = ? order by numero", comunidadId, function(err, res) {
  sql.query("SELECT c.id_comunidad, "+
  	"v.id_vivienda, v.numero, v.coeficiente,"+
    "pv.id_propietario,"+
    "p.id_propietario, p.nombre, p.apellidos, p.nif "+
  "from comunidad c " +
  "join vivienda v "+
  "on c.id_comunidad = v.comunidad_fk "+
  "left join prop_vivienda pv "+
  "on pv.id_vivienda = v.id_vivienda "+
  "left join propietario p "+
  "on p.id_propietario = pv.id_propietario "+
  "where c.id_comunidad = ? "+
  "order by v.id_vivienda, p.nombre, p.apellidos",
    comunidadId, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("get viviendas Comunidad "+comunidadId+": "+res.length);
      result(null, res);
    }
  });
};
Comunidad.getViviendasTest = function getVivs(comunidadId, result) {
  sql.query("select * from vivienda where comunidad_fk = ?", comunidadId, function(err, res) {
    if (err){
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("get viviendas Comunidad "+comunidadId+": "+res.length);
      result(null, res);
    }
  });
};
Comunidad.getFacturasComunidad = function getFacturas(comunidadId, year, result) {
  sql.query("Select * from factura where comunidad_fk = ? and year(fecha) = ? order by fecha",
   [comunidadId, year], function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("get facturas Comunidad "+comunidadId+": "+res.length);
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
      console.log('get all Comunidades: ',res.length);
      result(null, res);
    }
  });
};
Comunidad.update = function (comunidad, result) {
  sql.query("UPDATE comunidad SET nombre_comunidad = ? ," +
    " direccion = ? ," +
    " cp = ? ," +
    " poblacion = ? ," +
    " provincia = ? WHERE id_comunidad = ?",
    [comunidad.nombre_comunidad, comunidad.direccion, comunidad.cp, comunidad.poblacion, comunidad.provincia, comunidad.id_comunidad],
    function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("update comunidad: ", comunidad);
        result(null, res);
      }
    });
};
Comunidad.delete = function (id, result) {
  sql.query("DELETE FROM comunidad WHERE id_comunidad = ?", [id], function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("delete comunidad ", id);
      result(null, res);
    }
  });
};
Comunidad.getRelations = function (viviendaId, year, result) {
  sql.query("SELECT pv.id_prop_viv, pv.id_propietario, pv.fecha_ini, pv.fecha_fin, "+
  "p.nombre, p.apellidos, p.nif "+
  "FROM prop_vivienda pv "+
  "join propietario p on p.id_propietario = pv.id_propietario "+
  "WHERE id_vivienda = ? "+
  "and (year(fecha_ini) <= ? or fecha_ini is null)"+
  "and (year(fecha_fin) >= ? or fecha_fin is null)",
   [viviendaId, year, year], function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("get propietarios vivienda",viviendaId,year+":", res.length);
      result(null, res);
    }
  });
};
Comunidad.getDeudaAnterior = function  (idRel, year, result) {
  sql.query("Select coalesce(sum(importe), 0) as deuda from pago_cuota where prop_viv_fk = ? and year(fecha) < ? and pagado = 0",
  [idRel, year], function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("get deuda anterior Relation",idRel,year+":",res[0].deuda);
      result(null, res[0].deuda);
    }
  });
};
Comunidad.getCuotasVivienda = function (id_prop_viv, year, result) {
  sql.query("Select * from pago_cuota where prop_viv_fk = ? and year(fecha) = ? order by fecha",
  [id_prop_viv, year ], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("get cuotas Relation ",id_prop_viv,", año ",year,": ",res.length);
      result(null, res);
    }
  })
};
module.exports = Comunidad;
