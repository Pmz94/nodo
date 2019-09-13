console.log('Inicio del programa');

setTimeout(function() {
    console.log('1er Timeout');
}, 2000);

setTimeout(() => console.log('2do Timeout'), 0);

setTimeout(_ => console.log('3er Timeout'), 0);

Promise.resolve().then(_ => console.log('Promesa'));

console.log('Fin del programa');