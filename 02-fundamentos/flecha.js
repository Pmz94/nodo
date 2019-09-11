// function sumar(a, b) {
//     return a + b;
// }

// let sumar = (a, b) => a + b;

// function saludar() {
//     return 'Hola Mundo;
// }

//let saludar = (nombre) => `Hola ${nombre}`;

//console.log(saludar('Pedro'));

let alias = superheroe => `${superheroe.nombre} alias ${superheroe.alias}`;

let superheroes = {
    deadpool: {
        nombre: 'Wade Winston',
        alias: 'Deadpool',
        // getNombre() {
        //     return alias(this);
        // }
    },
    ironman: {
        nombre: 'Tony Stark',
        alias: 'Iron Man',
        // getNombre: function() {
        //     return alias(this);
        // }
    },
    hulk: {
        nombre: 'Bruce Banner',
        alias: 'HULK',
        // getNombre: function() {
        //     return alias(this);
        // }
    },
    hawkeye: {
        nombre: 'Clint Barton',
        alias: 'Hawkeye',
        // getNombre: function() {
        //     return alias(this);
        // }
    }
}

for(let superheroe in superheroes) {
    let obj_superheroe = superheroes[superheroe]; 
    obj_superheroe.getNombre = function() {
        return alias(this);
    }
    console.log(obj_superheroe.getNombre());
}