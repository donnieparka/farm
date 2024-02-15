import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { Product } from './product.js';
import ejsMate from 'ejs-mate';
import { Farm, farmSchema } from './farm.js';
import methodMiddleware from './methodMiddleware.js';

const app = express();
app.engine('ejs', ejsMate);
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodMiddleware);

main().catch((e) => console.log(e));

async function main() {
	try {
		await mongoose.connect('mongodb://localhost:27017/farms');
		console.log('mongoose connesso');
	} catch (e) {
		console.log(e);
	}
}

// home screen con tutti i prodotti
app.get('/products', async (req, res) => {
	const products = await Product.find({});
	res.render('products', { products });
});

// FARM
app.get('/farms', async (req, res) => {
	const farms = await Farm.find({});
	res.render('farms', { farms });
});

// nuova farm
app.get('/farms/new', (req, res) => {
	res.render('newFarm');
});
app.post('/farms', async (req, res) => {
	const { body } = req;
	const newFarm = new Farm(body);
	await newFarm.save();
	res.redirect('/farms');
});

// mostro tutti i prodotti di una farm specifica
app.get('/farms/:id', async (req, res) => {
	const { id } = req.params;
	const farm = await Farm.findById(id).populate('products');
	res.render('showFarm', { id, farm });
});

app.delete('/farms/:id', async (req, res) => {
	await Farm.findByIdAndDelete(req.params.id);
	res.redirect('/farms');
});
// form per inserire nuovo prodotto dentro una farm
app.get('/farms/:id/products/new', async (req, res) => {
	const { id } = req.params;
	const farm = await Farm.findById(id);
	res.render('newProduct', { farm });
});

app.post('/farms/:id/products', async (req, res) => {
	const { id } = req.params;
	const farm = await Farm.findById(id);
	const prod = new Product(req.body);
	farm.products.push(prod);
	prod.farm = farm;
	await farm.save();
	await prod.save();
	res.redirect(`/farms/${farm._id}`);
});

// prodotti per categoria
app.get('/products/sort/:category', async (req, res) => {
	const { category } = req.params;
	// prettier-ignore
	const prods = await Product.find({ category: category }).populate('farm', 'name');
	res.render('showCategory', { prods });
});

// schermata prodotto con dettagli
app.get('/products/:id', async (req, res) => {
	const { id } = req.params;
	const prod = await Product.findById(id).populate('farm', 'name');
	res.render('showProd', { prod });
});
app.listen(3000, () => {
	console.log('listening port 3000');
});
