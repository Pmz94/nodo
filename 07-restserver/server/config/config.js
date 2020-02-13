// Puerto
process.env.PORT = process.env.PORT || 3000;

// Vencimiento del token
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.JWT_EXP = 60 * 60 * 24 * 30;

// contraseña del token
process.env.JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos
let urlDB;
if(process.env.NODE_ENV === 'dev') {
	urlDB = 'mongodb://localhost:27017/cafe';
} else {
	urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

// Google client ID
process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '253205716174-mc5lkfhu0amstfurags281sjqd66hlho.apps.googleusercontent.com';