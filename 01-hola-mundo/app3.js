console.log('Inicio del programa');

setTimeout(function() {
    console.log('1er Timeout');
}, 3000);

setTimeout(function() {
    console.log('2do Timeout');
}, 0);

setTimeout(function() {
    console.log('3er Timeout');
}, 0);

console.log('Fin del programa');