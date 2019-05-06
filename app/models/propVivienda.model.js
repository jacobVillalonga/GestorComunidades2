'user strict';
var sql = require('../config/db.config.js');

//Vivienda object constructor
var PropVivienda = function(propVivienda){
      this.id_vivienda = propVivienda.id_vivienda;
      this.id_propietario = propVivienda.id_propietario;
};

PropVivienda.addPropVivienda = function addPropietario(propVivienda, result) {
  sql.query("INSERT INTO prop_vivienda SET ?;",
    propVivienda, function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
  })
};

PropVivienda.removePropVivienda = function addPropietario(propVivienda, result) {
  sql.query("DELETE FROM `prop_vivienda` WHERE id_vivienda = ? AND id_propietario = ?;",
    [propVivienda.id_vivienda, propVivienda.id_propietario], function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
  })
};

module.exports= PropVivienda;
