'use strict';
module.exports = function(app) {
  var comunidadController = require('../controllers/comunidad.controller');

  // comunidadController Routes
  /*app.get('/', function(req, res) {
    res.render('index.html');
});*/
app.get('/', function (req, res) {
  var arr=comunidadController.list_all_comunidades.send;
  // console.log('arr------------',arr);
  res.render('index.ejs',{title: 'Comus',comunidades:{}})
})
  // app.route('/')
  //   .get(comunidadController.list_all_comunidades);
//     app.get('/', function (req, res) {comunidadController.list_all_comunidades
// });
  app.route('/comunidades')
    .get(comunidadController.list_all_comunidades,function(req, res){
      res.render('index.ejs',{ title: 'coms', comunidades:coms})})
    .post(function(req, res){
      comunidadController.insert_comunidad(req, res);
    });
;
   app.route('/comunidades/:idComunidad')
    .get(comunidadController.select_comunidad)
    .put(comunidadController.update_comunidad)
    .delete(comunidadController.delete_comunidad);

};
/*module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `players` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: Welcome to Socka | View Players
                ,players: result
            });
        });
    },
};*/
