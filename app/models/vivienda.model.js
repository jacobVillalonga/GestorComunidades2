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

module.exports= Vivienda;
