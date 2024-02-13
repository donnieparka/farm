import mongoose from 'mongoose';
import { Product } from './product.js';
main().catch((e) => console.log(e));
async function main() {
	try {
		await mongoose.connect('mongodb://localhost:27017/testmongoexpress');
		console.log('mongoose connesso');
	} catch (e) {
		console.log(e);
	}
}
await Product.deleteMany();
await Product.insertMany([
	{
		name: 'banana divertente',
		price: 2.99,
		category: 'fruit',
	},
	{
		name: 'zucchina magica',
		price: 3.49,
		category: 'vegetable',
	},
	{
		name: 'pomodoro misterioso',
		price: 4.99,
		category: 'vegetable',
	},
	{
		name: 'fragola seducente',
		price: 5.49,
		category: 'fruit',
	},
	{
		name: 'carota incantata',
		price: 2.79,
		category: 'vegetable',
	},
	{
		name: 'ananas irresistibile',
		price: 6.99,
		category: 'fruit',
	},
	{
		name: 'mela mangi',
		price: 8,
		category: 'figa',
	},
]);
mongoose.disconnect();
