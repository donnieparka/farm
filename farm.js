import mongoose from 'mongoose';

const farmSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'farm needs a name!'],
	},
	city: {
		type: String,
		required: [true, 'where the fuck is this farm'],
	},
	email: {
		type: String,
		required: [true, 'am i supposed to send a pidgeon?'],
	},
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
	],
});

const Farm = mongoose.model('Farm', farmSchema);
export { farmSchema, Farm };
