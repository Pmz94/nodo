const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['USER_ROLE','ADMIN_ROLE'],
    message: '{VALUE} no es un rol valido',
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es awebo']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es awebo']
    },
    password: {
        type: String,
        required: [true, 'Contraseña obligatoria']
    },
    img: { type: String, required: false },
    role: { type: String, default: 'USER_ROLE', enum: rolesValidos },
    estado: { type: Boolean, default: true },
    google: { type: Boolean, default: false }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let user_object = user.toObject();
    delete user_object.password;
    return user_object;
}

usuarioSchema.plugin(uniqueValidator, {
    message: 'Ya existe el campo {PATH} con el valor dado'
});

module.exports = mongoose.model('Usuarios', usuarioSchema);