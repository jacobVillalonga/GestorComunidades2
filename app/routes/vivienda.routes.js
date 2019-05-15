'use strict';
module.exports = function(app) {
  var viviendaController = require('../controllers/vivienda.controller');
  // viviendaController Routes

app.get('/viviendas', viviendaController.list_all_viviendas);

// app.get('*', function(req, res) {
//   res.sendFile(path.resolve('app/public/index.html'));
// });

  app.route('/comunidades/:idComunidad/viviendas')
    .post(function(req, res){
      viviendaController.insert_vivienda(req, res);
    });

  app.route('/comunidades/:idComunidad/viviendas/:idVivienda')
    // .get(viviendaController.select_vivienda)
    .post(function(req, res){
        viviendaController.update_vivienda(req,res);
    });
    app.route('/viviendas/:idVivienda')
      .get(viviendaController.select_vivienda)
      .post(function(req, res){
          viviendaController.update_vivienda(req,res);
      });

    app.route('/viviendas/:idVivienda/:year')
      .get(viviendaController.select_vivienda);

  app.route('/vivienda/:idVivienda/propietarios')
    .get(viviendaController.prop_vivienda);

  app.route('/vivienda/:idVivienda/propietarios/:idPropietario/add')
    .get(function(req, res){
      viviendaController.add_prop_vivienda(req,res);
    });

  app.route('/vivienda/:idVivienda/propietarios/:idPropietario/remove')
    .get(function(req, res){
      viviendaController.remove_prop_vivienda(req,res);
    });

  app.route('/viviendaDel/delete/:idVivienda')
    .get(viviendaController.delete_vivienda);

};
