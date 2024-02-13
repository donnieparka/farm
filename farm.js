import mongoose from 'mongoose';
import { Product } from './product.js';

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
farmSchema.post('findOneAndDelete', async function (farm) {
	if (farm.products.length) {
		await Product.deleteMany({ _id: { $in: farm.products } });
	}
});
const Farm = mongoose.model('Farm', farmSchema);
export { farmSchema, Farm };
