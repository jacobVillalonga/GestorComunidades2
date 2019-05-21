'user strict';
var sql = require('../config/db.config.js');

//Vivienda object constructor
var Vivienda = function(vivienda){
      this.numero = vivienda.numero;
      this.comunidad_fk = vivienda.comunidad_fk;
      this.coeficiente = vivienda.coeficiente;
};
Vivienda.getAllViviendas = function getAllViviendas(result) {
        sql.query("SELECT c.id_comunidad, c.nombre_comunidad, "+
          "v.id_vivienda, v.numero, v.coeficiente, v.comunidad_fk "+
          "FROM `vivienda` v "+
          "RIGHT JOIN comunidad c "+
          "on c.id_comunidad=v.comunidad_fk "+
          "ORDER by c.nombre_comunidad ",
         function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('get all viviendas: ',res.length);
                 result(null, res);
                }
            });
};
Vivienda.insert = function(newVivienda, result) {
        sql.query("INSERT INTO vivienda set ?", newVivienda, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log("insert vivienda: ",newVivienda);
                    result(null, res.insertId);
                }
            });
};
Vivienda.getViviendaById = function getVivienda(viviendaId, result) {
        sql.query("SELECT c.nombre_comunidad, v.id_vivienda, v.numero, v.coeficiente, v.comunidad_fk FROM vivienda v join comunidad c on c.id_comunidad = v.comunidad_fk WHERE id_vivienda = ? ", viviendaId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                  console.log("get vivienda: ",viviendaId);
                    result(null, res[0]);
                }
            });
};
Vivienda.getPropietariosVivienda = function getPropietarios(viviendaId, result) {
      sql.query("Select * from propietario as p join prop_vivienda pv on pv.id_propietario = p.id_propietario where pv.id_vivienda = ? order by nombre, apellidos",
        viviendaId, function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(err, null);
          } else {
            console.log("get propietarios vivienda ",viviendaId,": ",res.length);
            result(null, res);
          }
      })
};
Vivienda.getNoPropietarios = function getNoPropietarios(viviendaId, result) {
      sql.query("SELECT * FROM propietario WHERE id_propietario NOT IN (Select p.id_propietario from propietario as p join prop_vivienda pv on pv.id_propietario = p.id_propietario where pv.id_vivienda = ? ) order by nombre, apellidos",
        viviendaId, function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(err, null);
          } else {
            console.log("get no propietarios vivienda ",viviendaId,": ",res.length);
            result(null, res);
          }
      })
};
Vivienda.getCuotasVivienda = function getCuotas(viviendaId, year, result) {
      sql.query("Select * from pago_cuota where vivienda_fk = ? and year(fecha) = ? order by fecha",
        [viviendaId, year ], function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(err, null);
          } else {
            console.log("get cuotas vivienda ",viviendaId,", año ",year,": ",res.length);
            result(null, res);
          }
      })
};
Vivienda.getDeudaAnterior = function getDeuda(viviendaId, year, result) {
  sql.query("Select coalesce(sum(importe), 0) as deuda from pago_cuota where vivienda_fk = ? and year(fecha) < ? and pagado = 0",
    [viviendaId, year ], function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("get deuda vivienda ",viviendaId, " anterior ",year, ": ", res[0].deuda);
        result(null, res[0].deuda);
      }
    })
}
Vivienda.getViviendasComunidad = function getViviendas(comunidadId, result) {
        sql.query("Select * from vivienda where comunidad_fk = ? order by numero", comunidadId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                  console.log("get viviendas comunidad ",comunidadId,": ",res.length);
                    result(null, res);
                }
            });
};
Vivienda.update = function(vivienda, result){
  sql.query("UPDATE vivienda SET numero = ?, coeficiente = ? WHERE id_vivienda = ?",
  [vivienda.numero, vivienda.coeficiente, vivienda.id_vivienda], function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(null, err);
          } else {
            console.log("update vivienda: ",vivienda);
            result(null, res);
          }
      });
};
Vivienda.delete = function(idVivienda, result){
     sql.query("DELETE FROM vivienda WHERE id_vivienda = ?", [idVivienda], function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                } else {
                  console.log("delete vivienda: ",idVivienda);
                 result(null, res);
                }
      });
};
module.exports= Vivienda;
