'user strict';
var sql = require('../config/db.config.js');

//Vivienda object constructor
var Vivienda = function(vivienda){
      this.numero = vivienda.numero;
      this.comunidad_fk = vivienda.comunidad_fk;
      this.coeficiente = vivienda.coeficiente;
};
Vivienda.getAllViviendas = function getAllViviendas(result) {
        sql.query("SELECT c.nombre_comunidad, v.id_vivienda, v.numero, v.coeficiente, v.comunidad_fk FROM `vivienda` v JOIN comunidad c on c.id_comunidad=v.comunidad_fk ORDER by c.nombre_comunidad ",
         function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('vivienda : ', res);
                 result(null, res);
                }
            });
};
Vivienda.createVivienda = function createVivienda(newVivienda, result) {
        sql.query("INSERT INTO vivienda set ?", newVivienda, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
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
                    result(null, res);
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
            result(null, res);
          }
      })
};
Vivienda.getNoPropietarios = function getNoPropietarios(viviendaId, result) {
      sql.query("SELECT * FROM propietario WHERE id_propietario NOT IN (Select p.id_propietario from propietario as p join prop_vivienda pv on pv.id_propietario = p.id_propietario where pv.id_vivienda = ?)",
        viviendaId, function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(err, null);
          } else {
            result(null, res);
          }
      })
};
Vivienda.getCuotasVivienda = function getCuotas(viviendaId, result) {
      sql.query("Select * from pago_cuota where vivienda_fk = ? order by fecha",
        viviendaId, function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(err, null);
          } else {
            result(null, res);
          }
      })
};
Vivienda.getViviendasComunidad = function getViviendas(comunidadId, result) {
        sql.query("Select * from vivienda where comunidad_fk = ? order by numero", comunidadId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });
};
Vivienda.updateById = function(vivienda, result){
  sql.query("UPDATE vivienda SET numero = ?, coeficiente = ? WHERE id_vivienda = ?",
  [vivienda.numero, vivienda.coeficiente, vivienda.id_vivienda], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
};
Vivienda.remove = function(id, result){
     sql.query("DELETE FROM vivienda WHERE id_vivienda = ?", [id], function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                 result(null, res);
                }
            });
};
module.exports= Vivienda;
