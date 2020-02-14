const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
	descripcion: {
		type: String,
		unique: true,
		required: [true, 'Diga una descripcion']
	},
	usuario: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario'
	},
});

categoriaSchema.plugin(uniqueValidator, {
	message: 'Ya existe una categoria con la misma {PATH}'
});

module.exports = mongoose.model('Categoria', categoriaSchema);