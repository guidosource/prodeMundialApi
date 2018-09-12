
// Puerto
process.env.PORT = process.env.PORT || 3000;

// Vencimiento del token

process.env.VENCIMIENTO_TOKEN = 60 * 60 * 60 * 60;


// SEED de validacion

process.env.SEED = process.env.SEED || 'aca-esta-el-seed-desarrollo';

//Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if ( process.env.NODE_ENV === 'dev' ){
    
    urlDB = 'mongodb://localhost:27017/prode';
}
else{
    urlDB = 'mongodb://prode-ser:agustin2699@ds235860.mlab.com:35860/prode'
}


process.env.URLBASE = 'mongodb://prode-ser:agustin2699@ds235860.mlab.com:35860/prode';


