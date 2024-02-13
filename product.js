import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	category: {
		type: String,
		lowercase: true,
		enum: ['fruit', 'vegetable', 'figa', 'cazzo', 'culo', 'troia'],
	},
	farm: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Farm',
	},
});
export const Product = mongoose.model('Product', productSchema);
