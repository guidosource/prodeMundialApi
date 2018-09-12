const express = require('express');

const app = express();

app.use(require('./resultadoController'));
app.use(require('./usuarioController'));
app.use(require('./login'));

module.exports = app;
