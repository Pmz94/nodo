const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios');
const app = express();

app.get('/usuario', (req, res) => {
    res.json('get Usuario');
});

app.post('/usuario', (req, res) => {
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
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Usuario.findByIdAndUpdate(id, body, (err, usuarioDB) => {
        if(err) {
            res.status(400).json({
                status: false,
                message: err
            });
        }
        
        res.json({
            status: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario', (req, res) => {
    res.json('delete Usuario');
});

module.exports = app;