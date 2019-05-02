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
          sql.query("Select * from factura order by fecha", function (err, res) {
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
  Factura.getFacturaById = function getFactura(facturaId, result) {
    sql.query("Select * from factura where id_factura = ? ", facturaId, function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);

      }
    });
  };
  module.exports= Factura;
