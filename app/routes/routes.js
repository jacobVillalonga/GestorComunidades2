module.exports = function (app) {

        /* registration */
//     app.post('/users', require('./routes/register-users'));    // register user
// };
require('./index.routes')(app);
require('./comunidad.routes')(app);
require('./vivienda.routes')(app);
require('./propietario.routes')(app);
require('./factura.routes')(app);
require('./cuota.routes')(app);
require('./derrama.routes')(app);
require('./incidencia.routes')(app);
};
