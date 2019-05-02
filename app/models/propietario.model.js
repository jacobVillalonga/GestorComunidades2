'user strict';
var sql = require('../config/db.config.js');

//Propietario object constructor
var Propietario = function(propietario){

        this.nombre = propietario.nombre;
        this.apellidos = propietario.apellidos;
        this.nif = propietario.nif;
        this.fecha_nacimiento = propietario.fecha_nacimiento;
        this.sexo = propietario.sexo;
        this.telefono = propietario.telefono;
        this.telefono2 = propietario.telefono2;
        this.email = propietario.email;
        this.direccion = propietario.direccion;
        this.cp = propietario.cp;
        this.poblacion = propietario.poblacion;
        this.provincia = propietario.provincia;
        this.pais = propietario.pais;

  };
  Propietario.getAllPropietarios = function getAllPropietarios(result) {
          sql.query("Select * from propietario order by nombre, apellidos", function (err, res) {
                  if(err) {
                      console.log("error: ", err);
                      result(null, err);
                  }
                  else{
                    console.log('propietario : ', res);
                   result(null, res);
                  }
              });
  };
  Propietario.getPropietarioById = function getPropietario(propietarioId, result) {
    sql.query("Select * from propietario where id_propietario = ? ", propietarioId, function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);

      }
    });
  };
  Propietario.createPropietario = function createPropietario(newPropietario, result) {
    sql.query("INSERT INTO propietario set ?", newPropietario, function(err, res) {

      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  };
  Propietario.updateById = function(id, propietario, result) {
    // @TODO adaptar query a propietario
    sql.query("UPDATE propietario SET nombre = ? ," +
      " apellidos = ? ," +
      " nif = ? ," +
      " fecha_nacimiento = ? ," +
      " sexo = ? ," +
      " telefono = ? ," +
      " telefono2 = ? ," +
      " email = ? ," +
      " direccion = ? ," +
      " cp = ? ," +
      " pais = ? ," +
      " poblacion = ? ," +
      " provincia = ? WHERE id_propietario = ?",
      [propietario.nombre,
        propietario.apellidos,
        propietario.nif,
        propietario.fecha_nacimiento,
        propietario.sexo,
        propietario.telefono,
        propietario.telefono2,
        propietario.email,
        propietario.direccion,
        propietario.cp,
        propietario.pais,
        propietario.poblacion,
        propietario.provincia,
        id],
      function(err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          result(null, res);
        }
      });
  };
  Propietario.remove = function(id, result) {
    sql.query("DELETE FROM propietario WHERE id_propietario = ?", [id], function(err, res) {

      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {

        result(null, res);
      }
    });
  };
  module.exports= Propietario;
