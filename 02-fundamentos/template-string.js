let nombre = 'Deadpool';
let real = 'Wade';

let nombreCompleto = nombre + ' es ' + real;
let nombreTemplate = `${nombre} es ${real}`;

console.log(nombreCompleto === nombreTemplate);

function identidad() {
    return `El verdadero nombre de ${nombre} es ${real}`;
}

console.log(identidad());