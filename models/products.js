const connection = require('../config/db');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }]
});

const Product = connection.model('Product', productSchema);

module.exports = Product;
