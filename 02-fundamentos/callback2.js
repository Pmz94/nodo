let empleados = [
	{
		id: 1,
		nombre: 'Pedro'
	},
	{
		id: 2,
		nombre: 'Pablo'
	},
	{
		id: 3,
		nombre: 'Victor'
	}
];

let salarios = [
	{
		id: 1,
		salario: 1000
	},
	{
		id: 2,
		salario: 2000
	}
];

let getEmpleado = (id, callback) => {
	let empleadoDB = empleados.find(empleado => empleado.id === id);

	if(!empleadoDB) {
		callback(null, 'No hay empleado con id ' + id);
	} else {
		callback(empleadoDB, null);
	}
};

// {
//     nombre: 'Pedro',
//     salario: 3000
// }

// No se encontro un salario para el empleado
let getSalario = (empleado, callback) => {
	let salarioDB = salarios.find(salario => salario.id === empleado.id);

	if(!salarioDB) {
		callback(null, 'No se encontro un salario para el empleado ' + empleado.nombre);
	} else {
		callback({
			nombre: empleado.nombre,
			salario: salarioDB.salario
		}, null);
	}
};

getEmpleado(1, (empleado, err) => {
	if(err) return console.log(err);
	getSalario(empleado, (res, err) => {
		if(err) return console.log(err);
		console.log(`El salario de ${res.nombre} es de ${res.salario}`);
	});
});