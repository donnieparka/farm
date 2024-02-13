import mongoose from 'mongoose';
import { Product } from './product.js';
import { Farm } from './farm.js';
connection().catch((e) => console.log(e));
async function connection() {
	try {
		await mongoose.connect('mongodb://localhost:27017/farms');
		console.log('mongoose connesso');
	} catch (e) {
		console.log(e);
	}
}
await Product.deleteMany();
await Farm.deleteMany();
const farms = [
	// prettier-ignore
	{ name: 'Green Acres', city: 'Springfield', email: 'info@greenacres.com' },
	// prettier-ignore
	{ name: 'Golden Harvest', city: 'Pleasantville', email: 'contact@goldenharvest.com' },
	// prettier-ignore
	{ name: 'Sunshine Farms', city: 'Sunnydale', email: 'hello@sunshinefarms.com' },
	// prettier-ignore
	{ name: 'Happy Farm', city: 'Joyville', email: 'info@happyfarm.com' },
	// prettier-ignore
	{ name: 'Organic Oasis', city: 'Harmony', email: 'contact@organicoasis.com' },
	// prettier-ignore
	{ name: 'Fresh Fields', city: 'Greenville', email: 'hello@freshfields.com' },
	// prettier-ignore
	{ name: 'Maple Leaf Farm', city: 'Mapleton', email: 'info@mapleleaffarm.com' },
	// prettier-ignore
	{ name: 'Sunny Side Farm', city: 'Brighton', email: 'contact@sunnysidefarm.com' },
	// prettier-ignore
	{ name: 'Mountain View Farm', city: 'Summitville', email: 'hello@mountainviewfarm.com' },
	// prettier-ignore
	{ name: 'Riverbend Ranch', city: 'Riverside', email: 'info@riverbendranch.com' },
	// prettier-ignore
	{ name: 'Prairie Gardens', city: 'Meadowland', email: 'contact@prairiegardens.com' },
	// prettier-ignore
	{ name: 'Harvest Moon Farm', city: 'Moonville', email: 'hello@harvestmoonfarm.com' },
	// prettier-ignore
	{ name: 'Windy Hill Farm', city: 'Hillcrest', email: 'info@windyhillfarm.com' },
	// prettier-ignore
	{ name: 'Blue Sky Farm', city: 'Bluestone', email: 'contact@blueskyfarm.com' },
	// prettier-ignore
	{ name: 'Golden Fields', city: 'Goldenvale', email: 'hello@goldenfields.com' },
	// prettier-ignore
	{ name: 'Green Pastures', city: 'Grassland', email: 'info@greenpastures.com' },
	// prettier-ignore
	{ name: 'Sunset Farm', city: 'Sunset Hills', email: 'contact@sunsetfarm.com' },
	// prettier-ignore
	{ name: 'Highland Ranch', city: 'Highland Park', email: 'hello@highlandranch.com' },
	// prettier-ignore
	{ name: 'Meadow Brook Farm', city: 'Brookfield', email: 'info@meadowbrookfarm.com' },
	// prettier-ignore
	{ name: 'Valley View Farm', city: 'Valleydale', email: 'contact@valleyviewfarm.com' },
];
// 	// Creazione di 40 prodotti (product) legati alle fattorie
// const products = await Product.create();

const products = [
	// prettier-ignore
	{ name: 'Apple', price: 1.99, category: 'fruit' },
	{ name: 'Orange', price: 2.49, category: 'fruit' },
	{ name: 'Banana', price: 1.79, category: 'fruit' },
	{ name: 'Strawberry', price: 3.99, category: 'fruit' },
	{ name: 'Lemon', price: 1.29, category: 'fruit' },
	{ name: 'Tomato', price: 0.99, category: 'vegetable' },
	{ name: 'Potato', price: 2.29, category: 'vegetable' },
	{ name: 'Carrot', price: 1.49, category: 'vegetable' },
	{ name: 'Broccoli', price: 2.99, category: 'vegetable' },
	{ name: 'Spinach', price: 1.79, category: 'vegetable' },
	{ name: 'Eggplant', price: 2.49, category: 'vegetable' },
	{ name: 'Cucumber', price: 1.99, category: 'vegetable' },
	{ name: 'Watermelon', price: 4.99, category: 'fruit' },
	{ name: 'Peach', price: 3.49, category: 'fruit' },
	{ name: 'Grapes', price: 5.99, category: 'fruit' },
	{ name: 'Pineapple', price: 6.99, category: 'fruit' },
	{ name: 'Lettuce', price: 1.49, category: 'vegetable' },
	{ name: 'Bell Pepper', price: 1.79, category: 'vegetable' },
	{ name: 'Onion', price: 0.99, category: 'vegetable' },
	{ name: 'Garlic', price: 2.29, category: 'vegetable' },
];
let i = 0;
for (let farm of farms) {
	const prod = new Product(products[i]);
	const newFarm = new Farm(farm);
	newFarm.products.push(prod._id);
	prod.farm = newFarm._id;
	await newFarm.save();
	await prod.save();
	i++;
}

await mongoose.disconnect();

console.log('Database creation completed successfully.');
