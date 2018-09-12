
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;


let usuario = new Schema({
    nombre : {
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true
    },
    password : {
        type : String,
        required : [true, 'La contraseña es necesaria']
     },
    participo : {
        type : Boolean,
        default : false
    },
    prode : {
        type : [String],
        required : false
    },
    role : {
        type : String,
        default : 'USER_ROLE',
        enum : rolesValidos
    },
    img : {
        type : String,
        required : false
    },
    estado : {
        type: Boolean,
        default: true
    }

});

//Funcion para no devolver el campo password.
usuario.methods.toJSON = function(){
    
    let user = this; //obtenemos el ob usuario.
    let userOB = user.toObject(); //convertimos user a objeto.
    delete userOB.password; //eliminamos el atributo password.
    
    return userOB;
}

usuario.plugin(uniqueValidator, { message : '{PATH} no se puede repetir'});


module.exports = mongoose.model('Usuario',usuario);