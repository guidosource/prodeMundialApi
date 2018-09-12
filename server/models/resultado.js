const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let resultadosValidos = {
    values : ['Local','Visitante','Empate'],
    message : '{VALUE} no es un resultado valido'
};

let Schema = mongoose.Schema;


let resultado = new Schema({
    partido : {
        type : Number,
        required : true,
        unique : true
    },
    resultado : {
        type : String,
        required : true,
         enum : resultadosValidos
    }
});

resultado.plugin( uniqueValidator, {
    message : '{PATH} ya existe, no se puede repetir'
});

module.exports = mongoose.model('Resultado',resultado);