const express = require('express');
const Categoria = require('../models/categoria');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const app = express();

app.get('/categoria', verificaToken, (req, res) => {
	Categoria.find({})
	.sort('descripcion')
	.populate('usuario', 'nombre email')
	.exec((err, categorias) => {
		if(err) return res.status(500).send({ ok: false, err });
		res.send({ ok: true, categorias });
	});
});

app.get('/categoria/:id', verificaToken, (req, res) => {
	let id = req.params.id;
	Categoria.findById(id, 'descripcion usuario', (err, categoriaDB) => {
		if(err) return res.status(500).send({ ok: false, err });
		if(!categoriaDB) return res.status(400).send({ ok: false, err: { message: 'Esa categoria no existe' } });
		res.send({ ok: true, categoriaDB });
	});
});

app.post('/categoria', verificaToken, (req, res) => {
	let body = req.body;

	let categoria = new Categoria({
		descripcion: body.descripcion,
		usuario: req.usuario._id,
	});

	categoria.save((err, categoriaDB) => {
		if(err) return res.status(500).send({ ok: false, err });
		if(!categoriaDB) return res.status(400).send({ ok: false, err });

		res.send({
			ok: true,
			message: 'Categoria creada',
			usuario: categoriaDB
		});
	});
});

app.put('/categoria/:id', verificaToken, (req, res) => {
	let id = req.params.id;
	let { body } = req;

	let descCategoria = {
		descripcion: body.descripcion
	};

	Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true, useFindAndModify: false }, (err, categoriaDB) => {
		if(err) return res.status(500).send({ ok: false, err });
		if(!categoriaDB) return res.status(400).send({ ok: false, err });

		res.send({
			ok: true,
			message: 'Categoria modificada',
			categoria: categoriaDB
		});
	});
});

app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
	let id = req.params.id;

	Categoria.findByIdAndRemove(id, { useFindAndModify: false }, (err, categoriaBorrada) => {
		if(err) return res.status(500).send({ ok: false, err });
		if(!categoriaBorrada) return res.status(400).send({ ok: false, err: { message: 'Esa categoria no existe' } });

		res.send({
			ok: true,
			message: 'Categoria Borrada',
			// categoria_borrada: categoriaBorrada
		});
	});
});

module.exports = app;