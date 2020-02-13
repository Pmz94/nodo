const jwt = require('jsonwebtoken');

// Verificar token
let verificaToken = (req, res, next) => {
	let token = req.get('Authorization');

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if(err) return res.status(401).send({ ok: false, err: { message: 'Token no valido', server_message: err } });

		req.usuario = decoded.usuario;
		next();
	});
};

// Verificar ADMIN_ROLE
let verificaAdmin_Role = (req, res, next) => {
	let usuario = req.usuario;

	if(usuario.role === 'ADMIN_ROLE') next();
	else return res.send({ ok: false, err: { message: 'El usuario no es admin' } });
};

function parseJwt(token) {
	let base64Url = token.split('.')[1];
	let base64 = base64Url.replace('-', '+').replace('_', '/');
	return JSON.parse(window.atob(base64));
}

module.exports = { verificaToken, verificaAdmin_Role };