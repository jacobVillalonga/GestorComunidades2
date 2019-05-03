'user strict';
var sql = require('../config/db.config.js');

//Vivienda object constructor
var Cuota = function(cuota){
      this.importe = cuota.importe;
      this.vivienda_fk = cuota.vivienda_fk;
      this.fecha = cuota.fecha;
      this.pagado = cuota.pagado;
};
Cuota.getAllCuotas = function getAllCuotas(result) {
        sql.query("Select * from pago_cuota", function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('cuota : ', res);
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
      result(null, res);

    }
  });
};
module.exports= Cuota;
