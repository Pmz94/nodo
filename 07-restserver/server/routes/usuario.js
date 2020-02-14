const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const app = express();

app.get('/usuario', verificaToken, (req, res) => {
	let estado = req.query.estado || true;

	let desde = req.query.desde || 0;
	desde = Number(desde);

	let limite = req.query.limite || 5;
	limite = Number(limite);

	let conds = { estado };

	Usuario.find(conds, 'nombre email role estado google img')
	.skip(desde)
	.limit(limite)
	.exec((err, usuarios) => {
		if(err) {
			res.status(400).json({
				status: false,
				message: err
			});
		}

		Usuario.countDocuments(conds, (err, count) => {
			res.json({
				status: true,
				limit: limite,
				offset: desde,
				count,
				usuarios
			});
		});
	});
});

app.post('/usuario', [verificaToken, verificaAdmin_Role], (req, res) => {
	let body = req.body;

	let usuario = new Usuario({
		nombre: body.nombre,
		email: body.email,
		password: bcrypt.hashSync(body.password, 12),
		role: body.role
	});

	usuario.save((err, usuarioDB) => {
		if(err) {
			res.status(400).json({
				status: false,
				message: err
			});
		}

		res.json({
			status: true,
			message: 'Usuario creado',
			usuario: usuarioDB
		});
	});
});

app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
	let id = req.params.id;
	let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

	Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, useFindAndModify: false }, (err, usuarioDB) => {
		if(err) {
			res.status(400).json({
				status: false,
				message: err
			});
		}

		res.json({
			status: true,
			message: 'Usuario modificado',
			usuario: usuarioDB
		});
	});
});

// cambiar estado a false nomas
/*app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { $set: { estado: false }}, { new: true }, (err, usuarioDB) => {
        if(err) {
            res.status(400).json({
                status: false,
                message: err
            });
        }

        res.json({
            status: true,
			message: 'Usuario Desactivado',
            // usuario: usuarioDB
        });
    });
});*/

// borrar fisicamente el registro
app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
	let id = req.params.id;

	Usuario.findByIdAndRemove(id, { useFindAndModify: false }, (err, usuarioBorrado) => {
		if(err) {
			res.status(400).json({
				status: false,
				message: err
			});
		}

		if(usuarioBorrado) {
			res.json({
				status: true,
				message: 'Usuario Borrado',
				// usuario_borrado: usuarioBorrado
			});
		} else {
			res.json({
				status: false,
				message: 'Usuario no encontrado'
			});
		}
	});
});

module.exports = app;