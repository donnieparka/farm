import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { Product } from './product.js';
import ejsMate from 'ejs-mate';
import { Farm, farmSchema } from './farm.js';

const app = express();
app.engine('ejs', ejsMate);
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

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
	res.render('index', { products });
});

app.post('/');

// ricevo il form e aggiungo il prodotto al database
app.post('/products', async (req, res) => {
	const prod = new Product(req.body);
	await prod.save(prod);
	res.redirect('/products');
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
	await newFarm.save().then((a) => console.log(a));
	res.redirect('/farms');
});

// dettagli farm
app.get('/farms/:id', async (req, res) => {
	const { id } = req.params;
	const farm = await Farm.findById(id);
	res.render('showFarm', { id, farm });
});

// mostro tutti i prodotti di una farm specifica
app.get('/farms/:id/products', async (req, res) => {
	const { id } = req.params;
	const farm = await Farm.findById(id);
	res.render('farmProducts', { id, farm });
});

// form per inserire nuovo prodotto dentro una farm
app.get('/farms/:id/products/new', (req, res) => {
	const { id } = req.params;
	res.render('newProduct', { id });
});

app.post('/farms/:id/products', (req, res) => {
	const { id } = req.params;
	const farm = Farm.findById(id);
	const prod = new Product(req.body);
	farm.products.push(prod);
	prod.farm = farm;
});

// schermata prodotto con dettagli
app.get('/products/:id', async (req, res) => {
	const { id } = req.params;
	const prod = await Product.findById(id);
	res.render('details', { prod });
});
app.listen(3000, () => {
	console.log('listening port 3000');
});