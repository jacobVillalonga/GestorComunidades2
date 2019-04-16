'use strict';
module.exports = function(app) {
  var cuotaController = require('../controllers/cuota.controller');
  // cuotaController Routes

  app.route('/cuotas')
    .get(cuotaController.list_all_cuotas)
    ;
};
