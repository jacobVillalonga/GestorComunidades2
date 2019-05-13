module.exports = function (app) {

        /* registration */
//     app.post('/users', require('./routes/register-users'));    // register user
//     app.post('/agents', require('./routes/register-agents'));    // register agents
// };
require('./index.routes')(app);
require('./comunidad.routes')(app);
require('./vivienda.routes')(app);
require('./propietario.routes')(app);
require('./factura.routes')(app);
require('./cuota.routes')(app);
require('./incidencia.routes')(app);
};
