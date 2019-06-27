// Puerto
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos
let db;
let urlDB;
if(process.env.NODE_ENV === 'dev') {
    urlDB = '';
} else {
    db = {
        adapter: '',
        user: '',
        password: '',
        host: '',
        dbname: ''
    };
    urlDB = `${db.adapter}://${db.user}:${db.password}@${db.host}/${db.dbname}`;    
}

process.env.URLDB = urlDB;