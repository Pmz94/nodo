let getNombre = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Benny');
        }, 3000);
    });
};

let saludo = async() => {
    let nombre = await getNombre();
    return `Hola ${nombre}`;
}

saludo().then(mensaje => {
    console.log(mensaje);
});