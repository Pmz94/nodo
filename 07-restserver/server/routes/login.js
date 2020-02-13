const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const _ = require('underscore');
const Usuario = require('../models/usuarios');
const app = express();

app.post('/login', (req, res) => {

	let body = req.body;

	Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
		if(err) return res.status(500).send({ ok: false, err });

		if(!usuarioDB) return res.status(404).send({ ok: false, err: { message: 'Usuario no encontrado' } });

		if(!bcrypt.compareSync(body.password, usuarioDB.password)) {
			return res.status(400).send({ ok: false, err: { message: 'Contraseña incorrecta' } });
		}

		let token = jwt.sign({
			usuario: usuarioDB,
		}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });

		res.send({ ok: true, usuario: usuarioDB, token });
	});
});

// Configuracion de google
async function verify(token) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
	});
	const payload = ticket.getPayload();

	return {
		nombre: payload.name,
		email: payload.email,
		img: payload.picture,
		google: true
	};
}

app.post('/google', async (req, res) => {

	let token = req.body.idtoken;

	let googleUser = await verify(token).catch(e => {
		return res.status(403).send({
			ok: false,
			err: e
		});
	});

	Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
		if(err) return res.status(500).send({ ok: false, err });

		if(usuarioDB) {
			if(!usuarioDB.google) {
				return res.status(400).send({ ok: false, err: { message: 'Debe usar su autenticacion normal' } });
			} else {
				let token = jwt.sign({
					usuario: usuarioDB,
				}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });

				return res.send({ ok: true, usuario: usuarioDB, token });
			}
		} else {
			// Si el usuario no existe en nuestra BD
			let usuario = new Usuario({
				nombre: googleUser.nombre,
				email: googleUser.email,
				img: googleUser.img,
				google: true,
				password: ':)',
			});

			usuario.save((err, usuarioDB) => {
				if(err) return res.status(500).send({ ok: false, err });

				let token = jwt.sign({
					usuario: usuarioDB,
				}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });

				return res.send({ ok: true, usuario: usuarioDB, token });
			});
		}
	});
});

module.exports = app;