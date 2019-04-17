'user strict';
var sql = require('../config/db.config.js');

//Vivienda object constructor
var Vivienda = function(vivienda){
      this.numero = vivienda.numero;
      this.comunidad_fk = vivienda.comunidad_fk;
};
Vivienda.getAllViviendas = function getAllViviendas(result) {
        sql.query("Select * from vivienda", function (err, res) {
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
        sql.query("Select * from vivienda where id_vivienda = ? ", viviendaId, function (err, res) {
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
      sql.query("Select p.id_propietario,p.nombre,p.apellidos,p.nif from propietario p"+
                +"join prop_vivienda pv on pv.id_propietario = p.id_propietario"+
                +"where pv.id_vivienda = ? ",
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
        sql.query("Select * from vivienda where comunidad_fk = ? ", comunidadId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });
};
Vivienda.updateById = function(id, vivienda, result){
  sql.query("UPDATE vivienda SET numero = ? WHERE id_vivienda = ?", [vivienda.numero, id], function (err, res) {
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
