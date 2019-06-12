'use strict';
module.exports = function(app) {
  var derramaController = require('../controllers/derrama.controller');
  // derramaController Routes

  app.route('/derramas')
    .get(derramaController.list_all_derramas)
    .post(function(req, res) {
        derramaController.insert_derrama(req, res);
      });

  app.route('/viviendas/:idVivienda/derramas/:idDerrama')
    .get(derramaController.select_derrama)
    .post(function(req, res) {
      derramaController.update_derrama(req, res);
    });

  app.route('/derramas/delete/:idDerrama')
    .get(derramaController.delete_derrama);
};
