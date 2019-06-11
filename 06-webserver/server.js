const express = require('express');
const app = express();

app.get('/', (req, res) => {
    let salida = {
        nombre: 'Benny',
        edad: 7,
        raza: 'Beagle',
        url: req.url
    }

    res.send(salida);
})

app.get('/data', (req, res) => {
    res.send('Hola data');
})

app.listen(3000, () => {
    console.log('Escuchando puerto 3000...');
});