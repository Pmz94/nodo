const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');

//console.log(argv);

let comando = argv._[0];

switch(comando.toLowerCase()) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        if(tarea) console.log(`Tarea "${tarea.descripcion}" creada!`.green);
        else console.log('No se pudo crear esta tarea, ya esta agregada!'.red);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        console.log('+---- Por hacer ----+'.blue);
        for(let tarea of listado) {
            console.log('|'.blue, 'Tarea:', tarea.descripcion, '|'.blue);
            console.log('|'.blue, 'Completada:', tarea.completado, '|'.blue);
            console.log('+-------------------+'.blue);
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        if(actualizado) console.log(`Tarea actualizada a ${argv.completado}!`.green);
        else console.log(`No se pudo actualizar esta tarea`.red);
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        if(borrado) console.log(`Tarea borrada!`.green);
        else console.log('No se pudo borrar esta tarea, a lo mejor ya estaba borrada o nunca existio!'.red);
        break;
    default:
        console.log('Comando desconocido'.red);
        break;
}