let getNombre = () => {
    return new Promise((resolve, reject) => {
        if(new Date().getHours() <= 16) {
            setTimeout(() => {
                resolve('Benny');
            }, 3000);
        } else {
            reject('Ya es tarde para esto');
        }
    });
};

let saludo = async () => {
    let nombre = await getNombre();
    return `Hola ${nombre}`;
}

saludo().then(console.log).catch(console.error);