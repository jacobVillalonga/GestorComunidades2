'use strict';
module.exports = function(app) {
  var propietarioController = require('../controllers/propietario.controller');

  app.route('/propietarios')
    .get(propietarioController.list_all_propietarios)
    ;
};
