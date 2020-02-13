const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
	direccion: {
		alias: 'd',
		desc: 'Direccion de la ciudad para obtener el clima',
		demand: true,
	}
}).argv;

async function getInfo(direccion) {
	try {
		const coords = await lugar.getLugarLatLon(direccion);
		const temp = await clima.getClima(coords.latitud, coords.longitud);
		return `El clima de ${coords.lugar} es de ${temp}.`;
	} catch(e) {
		return `No se pudo obtener el clima de ${direccion.charAt(0).toUpperCase() + direccion.slice(1)}.`;
	}
}

getInfo(argv.direccion).then(console.log).catch(console.log);