'user strict';
var sql = require('../config/db.config.js');

//Factura object constructor
var Factura = function(factura){

        this.importe = factura.importe;
        this.fecha = factura.fecha;
        this.concepto = factura.concepto;
        this.comunidad_fk = factura.comunidad_fk;
  };
  Factura.getAllFacturas = function getAllFacturas(result) {
          sql.query("Select * from factura", function (err, res) {
                  if(err) {
                      console.log("error: ", err);
                      result(null, err);
                  }
                  else{
                    console.log('factura : ', res);
                   result(null, res);
                  }
              });
  };

  module.exports= Factura;
