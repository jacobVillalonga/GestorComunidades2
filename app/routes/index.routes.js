'use strict';
module.exports = function(app) {

    var viviendaController = require('../controllers/vivienda.controller');
  app.route('/')
    .get(function(req, res) {
      res.render('index.ejs', {
        title: 'Gestor Comunidades'
      })
    });
    // app.route('/hi')
    //   .get(viviendaController.list_all_viviendas);

        app.get('/hi', function(req, res) {
          var viviendas = viviendaController.list_all_viviendas;
          console.log(viviendas.title);
          console.log("ok");
        	res.sendFile(path.resolve('app/public/index.html'));
        });
};

// module.exports = function(app) {
//   app.set('appPath', 'public');
// app.use(express.static(__dirname +'/public'));
//
// app.route('/*')
//   .get(function(req, res) {
//     res.sendfile(app.get('appPath') + '/index.html');
//   });
//
//   app.route('/')
//     .get(function(req, res) {
//       res.render('index.ejs', {
//         title: 'Gestor Comunidades'
//       })
//     });
//
//         app.get('/hi', function(req, res) {
//           // path, {'root': '/path/to/root/directory'}
//         	res.sendFile(path.resolve('app/public/index.html'));
//         });
// };
