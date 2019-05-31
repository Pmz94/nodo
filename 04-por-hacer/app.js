const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');

//console.log(argv);

let comando = argv._[0];

switch(comando.toLowerCase()) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log('');
        console.log(`Tarea "${tarea.descripcion}" creada!`.green);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        console.log('');
        console.log('+---- Por hacer ----+'.blue);
        for(let tarea of listado) {
            console.log('|'.blue, 'Tarea:', tarea.descripcion, '|'.blue);
            console.log('|'.blue, 'Estado:', tarea.completado, '|'.blue);
            console.log('+-------------------+'.blue);
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        if(actualizado) console.log(`Tarea actualizada!`.green);
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        if(borrado) console.log(`Tarea borrada!`.green);
        break;
    default:
        console.log('Comando desconocido');
        break;
}