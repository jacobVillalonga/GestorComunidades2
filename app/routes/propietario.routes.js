'use strict';
module.exports = function(app) {
  var propietarioController = require('../controllers/propietario.controller');

  app.route('/propietarios')
    .get(propietarioController.list_all_propietarios);
  //insert
  app.route('/propietarios/:idPropietario')
    .get(propietarioController.select_propietario)
    .post(function(req, res) {
      propietarioController.update_propietario(req, res);
    });
  //delete
};
