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
          sql.query("Select * from propietario", function (err, res) {
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

  module.exports= Propietario;
