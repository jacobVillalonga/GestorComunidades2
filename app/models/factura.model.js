'user strict';
var sql = require('../config/db.config.js');

//Factura object constructor
var Factura = function(factura) {

  this.importe = factura.importe;
  this.emisor = factura.emisor;
  this.fecha = factura.fecha;
  this.concepto = factura.concepto;
  this.archivo = factura.archivo;
  this.comunidad_fk = factura.comunidad_fk;
};
//not used
Factura.getAllFacturas = function getAllFacturas(result) {
  sql.query("Select * from factura order by fecha", function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log('get all facturas ');
      result(null, res);
    }
  });
};
Factura.getFacturaById = function getFactura(facturaId, result) {
  sql.query("Select f.*, c.nombre_comunidad from factura f join comunidad c on c.id_comunidad = f.comunidad_fk where id_factura = ? ", facturaId, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("get factura: ",facturaId);
      result(null, res[0]);
    }
  });
};
Factura.insert = function insertFactura(factura, result) {
  sql.query("INSERT INTO factura set ?", factura, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("insert factura: ",factura);
      result(null, res.insertId);
    }
  });
};
Factura.update = function updateFactura(factura, result) {
  sql.query("UPDATE factura SET emisor = ?, importe = ?, fecha = ?, concepto = ?, archivo = ? WHERE id_factura = ?",
    [factura.emisor, factura.importe, factura.fecha, factura.concepto, factura.archivo, factura.id_factura],
    function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("update factura: ", factura)
        result(null, res);
      }
    });
};
Factura.delete = function(idFactura, result) {
  sql.query("DELETE FROM factura WHERE id_factura = ?", [idFactura], function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("delete factura ",idFactura)
      result(null, res);
    }
  });
};
module.exports = Factura;
