'user strict';
var sql = require('../db.js');

//Comunidad object constructor
var Comunidad = function(comunidad){
    this.nombre_comunidad = comunidad.nombre_comunidad;
    this.direccion = comunidad.direccion;
    this.cp = comunidad.cp;
    this.poblacion = comunidad.poblacion;
    this.provincia = comunidad.provincia;
};
Comunidad.createComunidad = function createComunidad(newComunidad, result) {
  console.log('comu model insert');
        sql.query("INSERT INTO comunidad set ?", newComunidad, function (err, res) {

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
Comunidad.getComunidadById = function createUser(comunidadId, result) {
        sql.query("Select nombre_comunidad from comunidad where id_comunidad = ? ", comunidadId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);

                }
            });
};
Comunidad.getAllComunidades = function getAllComunidades(result) {
        sql.query("Select * from comunidad", function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('comunidad : ', res);
                 result(null, res);
                }
            });
};
Comunidad.updateById = function(id, comunidad, result){
  sql.query("UPDATE comunidad SET nombre_comunidad = ? WHERE id_comunidad = ?", [comunidad.nombre_comunidad, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
};
Comunidad.remove = function(id, result){
     sql.query("DELETE FROM comunidad WHERE id_comunidad = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{

                 result(null, res);
                }
            });
};

module.exports= Comunidad;
