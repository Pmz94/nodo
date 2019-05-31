const fs = require('fs');
const colors = require('colors');

let listarTabla = (base, limite = 10) => {

    if(!Number(base)) {
        reject(`El valor introducido ${base} no es un numero`);
        return;
    }
    if(!Number(limite)) {
        reject(`El valor introducido ${limite} no es un numero`);
        return;
    }

    console.log('+-------------+'.blue);
    console.log(`| Tabla del ${base} |`.blue);
    console.log('+-------------+'.blue);

    for(let i = 1; i <= limite; i++) {
        console.log('|'.blue, `${base} * ${i} = ${base * i}`, '|'.blue);
    }

    console.log('+-------------+'.blue);
}

let crearArchivo = (base, limite = 10) => {
    return new Promise((resolve, reject) => {

        if(!Number(base)) {
            reject(`El valor introducido ${base} no es un numero`);
            return;
        }
        if(!Number(limite)) {
            reject(`El valor introducido ${limite} no es un numero`);
            return;
        }

        let data = '';
        for(let i = 1; i <= limite; i++) {
            data += `${base} * ${i} = ${base * i}`;
            data += (i < limite) ? '\n' : '';
        }

        fs.writeFile(`tablas/table-${base}_lim-${limite}.txt`, data, (err) => {
            if(err) reject(err)
            else resolve(`table-${base}_lim-${limite}.txt`);
        });
    });
}

module.exports = { crearArchivo, listarTabla }