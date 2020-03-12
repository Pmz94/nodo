require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const publicPath = path.resolve(__dirname, '../public');

// habilitar carpeta public
app.use(express.static(publicPath));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// configuracion global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, res) => {
	if(err) throw err;
	console.log('Base de datos conectada');
});

app.listen(process.env.PORT, err => {
	if(err) throw `Error de servidor: ${err}`;
	console.log(`Escuchando en http://localhost:${process.env.PORT}`);
});