const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const fs = require('fs');
const path = require('path');

app.use(fileUpload({ useTempFiles: true }));

app.put('/upload/:tipo/:id', (req, res) => {

	let tipo = req.params.tipo;
	let id = req.params.id;

	if(!req.files) return res.status(400).send({ ok: false, err: { message: 'No se ha seleccionado ningun archivo' } });

	// Validar tipo
	let tiposValidos = ['productos', 'usuarios'];
	if(tiposValidos.indexOf(tipo) < 0) {
		return res.status(400).send({
			ok: false,
			err: {
				message: 'Los tipos permitidas son: ' + tiposValidos.join(', '),
			}
		});
	}

	let archivo = req.files.archivo;
	let nombreCortado = archivo.name.split('.');
	let extension = nombreCortado[nombreCortado.length - 1];

	// Extensiones permitidas
	let extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

	if(extensionesValidas.indexOf(extension) < 0) {
		return res.status(400).send({
			ok: false,
			err: {
				message: 'Las extensiones permitidas son: ' + extensionesValidas.join(', '),
				ext: extension
			}
		});
	}

	// Cambiar nombre al archivo
	let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

	let ruta = `uploads/${tipo}/${nombreArchivo}`;

	archivo.mv(path.resolve(`${__dirname}/../../${ruta}`), err => {
		if(err) return res.status(500).send({ ok: false, err });

		if(tipo === 'usuarios') imagenUsuario(id, res, nombreArchivo);
		else if(tipo === 'productos') imagenProducto(id, res, nombreArchivo);
	});
});

function imagenUsuario(id, res, nombreArchivo) {
	Usuario.findById(id, (err, usuarioDB) => {

		if(err) {
			borrarArchivo(usuarioDB.img, 'usuarios');
			return res.status(500).send({ ok: false, err });
		}

		if(!usuarioDB) {
			borrarArchivo(usuarioDB.img, 'usuarios');
			return res.status(400).send({ ok: false, err: { message: 'Este usuario no existe' } });
		}

		borrarArchivo(usuarioDB.img, 'usuarios');

		usuarioDB.img = nombreArchivo;

		usuarioDB.save((err, usuarioGuardado) => {
			res.send({ ok: true, message: 'Imagen asignada a usuario', usuario: usuarioGuardado, img: nombreArchivo });
		});
	});
}

function imagenProducto(id, res, nombreArchivo) {
	Producto.findById(id, (err, productoDB) => {

		if(err) {
			borrarArchivo(productoDB.img, 'productos');
			return res.status(500).send({ ok: false, err });
		}

		if(!productoDB) {
			borrarArchivo(productoDB.img, 'productos');
			return res.status(400).send({ ok: false, err: { message: 'Este producto no existe' } });
		}

		borrarArchivo(productoDB.img, 'productos');

		productoDB.img = nombreArchivo;

		productoDB.save((err, productoGuardado) => {
			res.send({ ok: true, message: 'Imagen asignada a producto', usuario: productoGuardado, img: nombreArchivo });
		});
	});
}

function borrarArchivo(nombreImagen, tipo) {
	let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
	if(fs.existsSync(pathImagen)) {
		fs.unlinkSync(pathImagen);
	}
}

module.exports = app;