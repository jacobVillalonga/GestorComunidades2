'user strict';
var sql = require('../config/db.config.js');

//Factura object constructor
var Factura = function(factura) {

  this.importe = factura.importe;
  this.emisor = factura.emisor;
  this.fecha = factura.fecha;
  this.concepto = factura.concepto;
  this.comunidad_fk = factura.comunidad_fk;
};

Factura.getAllFacturas = function getAllFacturas(result) {
  sql.query("Select * from factura order by fecha", function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log('factura : ', res);
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
      result(null, res);

    }
  });
};
Factura.insertFactura = function insertFactura(factura, result) {
  sql.query("INSERT INTO factura set ?", factura, function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Factura.updateFactura = function updateFactura(factura, result) {
  sql.query("UPDATE factura SET emisor = ?, importe = ?, fecha = ?, concepto = ? WHERE id_factura = ?",
    [factura.emisor, factura.importe, factura.fecha, factura.concepto, factura.id_factura],
    function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
};
Factura.removeFactura = function(id, result) {
  sql.query("DELETE FROM factura WHERE id_factura = ?", [id], function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = Factura;
