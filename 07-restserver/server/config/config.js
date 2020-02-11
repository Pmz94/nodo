// Puerto
process.env.PORT = process.env.PORT || 3000;

// Vencimiento del token
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// contraseña del token
process.env.SECRET = process.env.SECRET || 'secret';

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos
let urlDB;
if(process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    /*
    let db = {
        adapter: '',
        user: '',
        password: '',
        host: '',
        dbname: ''
    };
    urlDB = `${db.adapter}://${db.user}:${db.password}@${db.host}/${db.dbname}`;
    */
    urlDB = process.env.MONGO_URI;   
}

process.env.URLDB = urlDB;