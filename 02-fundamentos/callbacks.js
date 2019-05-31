// setTimeout(() => {
//     console.log('Hola');
// }, 3000);

let getUsuarioById = (id, callback) => {
    let usuario = {
        id,
        nombre: 'Pedro',
        apellido: 'Muñoz'
    }

    if (id == 10) {
        callback(null, `El usuario con id ${id} no existe`);
    } else {
        callback(usuario, null);
    }
}

getUsuarioById(13, (usuario, err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Usuario de base de datos', usuario);
});