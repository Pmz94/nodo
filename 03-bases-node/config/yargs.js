const opciones = {
    base: {
        demand: true,
        alias: 'b',
        desc: 'Numero de cual sera la tabla'
    },
    limite: {
        alias: 'l',
        default: 10,
        desc: 'Numero de hasta donde se multiplicara'
    }
};

const argv = require('yargs')
    .command('listar', 'Imprime en consola la tabla de multiplicar', opciones)
    .command('crear', 'Crea un archivo con la tabla de multiplicar', opciones)
    .help()
    .argv;

module.exports = { argv }