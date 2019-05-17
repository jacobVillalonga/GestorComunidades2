'user strict';
var sql = require('../config/db.config.js');

//Vivienda object constructor
var Cuota = function(cuota){
      this.importe = cuota.importe;
      this.vivienda_fk = cuota.vivienda_fk;
      this.fecha = cuota.fecha;
      this.pagado = cuota.pagado;
};
//not used
Cuota.getAllCuotas = function getAllCuotas(result) {
        sql.query("Select * from pago_cuota", function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('get all cuotas: ', res);
                 result(null, res);
                }
            });
};
Cuota.getCuotaById = function getCuota(cuotaId, result) {
  sql.query("SELECT * FROM pago_cuota c join vivienda v on c.vivienda_fk = v.id_vivienda where id_cuota = ? ", cuotaId, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("get cuota: ",cuotaId,res);
      result(null, res[0]);

    }
  });
};
Cuota.insert = function insertCuota(cuota, result) {
  sql.query("INSERT INTO pago_cuota set ?", cuota, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("insert cuota: ",cuota);
      result(null, res.insertId);
    }
  });
};
Cuota.update = function updateCuota(cuota, result) {
  sql.query("UPDATE pago_cuota SET vivienda_fk = ?, importe = ?, fecha = ?, pagado = ? WHERE id_cuota = ?",
    [cuota.vivienda_fk, cuota.importe, cuota.fecha, cuota.pagado, cuota.id_cuota],
    function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("update cuota: ",cuota);
        result(null, res);
      }
    });
};
Cuota.delete = function(cuotaId, result) {
  sql.query("DELETE FROM pago_cuota WHERE id_cuota = ?", [cuotaId], function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("delete cuota: ",cuotaId);
      result(null, res);
    }
  });
};
module.exports= Cuota;
