'use strict';
module.exports = function(app) {
  var comunidadController = require('../controllers/comunidad.controller');

// var coms = {};
// app.get('/', function (req, res) {
//   coms=comunidadController.list_all_comunidades.send;
//   console.log('arr------------',coms);
//   res.render('index.ejs',{title: 'Gestor Comunidades',comunidades:coms)
//
//       // con.connect(function (err) {
//       //     var sql = "SELECT * FROM questions";
//       //     con.query(sql, function (err, result) {
//       //         if (err) {
//       //             throw err;
//       //         } else {
//       //             obj = {print: result};
//       //             res.render('index', obj);
//       //         }
//       //     });
//       });
// });
  app.route('/')
    .get(comunidadController.list_all_comunidades);

  app.route('/comunidades')
    .get(comunidadController.list_all_comunidades)
    .post(function(req, res){
      comunidadController.insert_comunidad(req, res);
    });
;
   app.route('/comunidades/:idComunidad')
    .get(comunidadController.select_comunidad)
    .put(comunidadController.update_comunidad)
    .delete(comunidadController.delete_comunidad);

    app.route('/comunidades/delete/:idComunidad').get(comunidadController.delete_comunidad);
};
