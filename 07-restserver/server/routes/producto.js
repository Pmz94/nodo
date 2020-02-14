const express = require('express');
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();

app.get('/producto', verificaToken, (req, res) => {
	let disponible = req.query.disponible || true;

	let desde = req.query.desde || 0;
	desde = Number(desde);

	let limite = req.query.limite || 5;
	limite = Number(limite);

	let conds = { disponible };

	Producto.find(conds)
	.sort('nombre')
	.populate('usuario', 'nombre email')
	.populate('categoria', 'descripcion')
	.skip(desde)
	.limit(limite)
	.exec((err, productos) => {
		if(err) return res.status(500).send({ ok: false, err });

		Producto.countDocuments(conds, (err, count) => {
			res.send({
				ok: true,
				limit: limite,
				offset: desde,
				count,
				productos
			});
		});
	});
});

app.get('/producto/:id', verificaToken, (req, res) => {
	let id = req.params.id;
	Producto.findById(id, (err, productoDB) => {
		if(err) return res.status(500).send({ ok: false, err });
		if(!productoDB) return res.status(400).send({ ok: false, err: { message: 'Esa categoria no existe' } });
		res.send({ ok: true, productoDB });
	});
});

app.post('/producto', verificaToken, (req, res) => {
	let body = req.body;
	let id_categoria = body.id_categoria;

	Categoria.findById(id_categoria, (err, categoriaDB) => {
		if(err) return res.status(500).send({ ok: false, err });
		if(!categoriaDB) return res.status(400).send({ ok: false, err: { message: 'Esa categoria no existe' } });

		let producto = new Producto({
			nombre: body.nombre,
			precioUni: body.precioUni,
			descripcion: body.descripcion,
			disponible: body.disponible,
			categoria: categoriaDB._id,
			usuario: req.usuario._id,
		});

		producto.save((err, productoDB) => {
			if(err) return res.status(500).send({ ok: false, err });
			if(!productoDB) return res.status(400).send({ ok: false, err });

			res.send({
				ok: true,
				message: 'Producto creado',
				usuario: productoDB
			});
		});
	});
});

app.put('/producto/:id', verificaToken, (req, res) => {
	let id = req.params.id;
	let { body } = req;

	let descCategoria = {
		descripcion: body.descripcion
	};

	Producto.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true, useFindAndModify: false }, (err, productoDB) => {
		if(err) return res.status(500).send({ ok: false, err });
		if(!productoDB) return res.status(400).send({ ok: false, err });

		res.send({
			ok: true,
			message: 'Producto modificado',
			producto: productoDB
		});
	});
});

app.delete('/producto/:id', verificaToken, (req, res) => {
	let id = req.params.id;

	Producto.findByIdAndUpdate(id, { $set: { disponible: false } }, { new: true, useFindAndModify: false }, (err, productoDesactivado) => {
		if(err) return res.status(500).send({ ok: false, err });
		if(!productoDesactivado) return res.status(400).send({ ok: false, err: { message: 'Ese producto no existe' } });

		res.send({
			ok: true,
			message: 'Producto desactivado'
		});
	});
});

module.exports = app;