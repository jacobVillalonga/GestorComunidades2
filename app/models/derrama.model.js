'user strict';
var sql = require('../config/db.config.js');

//Derrama object constructor
var Derrama = function(derrama){
      this.importe = derrama.importe;
      this.vivienda_fk = derrama.vivienda_fk;
      this.fecha = derrama.fecha;
      this.pagado = derrama.pagado;
      this.fecha_pago = derrama.fecha_pago;
      this.comentario = derrama.comentario;
};
//not used
Derrama.getAllDerramas = function getAllDerramas(result) {
        sql.query("Select * from derrama", function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('get all derramas: ', res);
                 result(null, res);
                }
            });
};
Derrama.getDerramaById = function getDerrama(derramaId, result) {
  sql.query("SELECT * FROM derrama c join vivienda v on c.vivienda_fk = v.id_vivienda where id_derrama = ? ", derramaId, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("get derrama: ",derramaId,res);
      result(null, res[0]);

    }
  });
};
Derrama.insert = function insertDerrama(derrama, result) {
  sql.query("INSERT INTO derrama set ?", derrama, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("insert derrama: ",derrama);
      result(null, res.insertId);
    }
  });
};
Derrama.update = function updateDerrama(derrama, result) {
  sql.query("UPDATE derrama SET vivienda_fk = ?, importe = ?, fecha = ?, pagado = ?, fecha_pago = ?, comentario = ? WHERE id_derrama = ?",
    [derrama.vivienda_fk, derrama.importe, derrama.fecha, derrama.pagado, derrama.fecha_pago, derrama.comentario, derrama.id_derrama],
    function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("update derrama: ",derrama);
        result(null, res);
      }
    });
};
Derrama.delete = function(derramaId, result) {
  sql.query("DELETE FROM derrama WHERE id_derrama = ?", [derramaId], function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("delete derrama: ",derramaId);
      result(null, res);
    }
  });
};
module.exports= Derrama;
