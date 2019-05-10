'user strict';
var sql = require('../config/db.config.js');

//object constructor
var Incidencia = function(cuota){
      this.info = cuota.info;
      this.comunidad_fk = cuota.comunidad_fk;
      this.fecha = cuota.fecha;
      this.emisor = cuota.emisor;
};
