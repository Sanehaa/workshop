const Product = require('../models/products');


const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      statusCode: 200,
      products,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};


const addProducts = async (req, res) => {
  try {
      const products = JSON.parse(req.body.products); 

      if (!products || !Array.isArray(products)) {
          return res.status(400).json({ message: "Invalid request. 'products' must be an array." });
      }

      const savedProducts = [];
      for (let i = 0; i < products.length; i++) {
          const { name, description, price } = products[i];

          const images = req.files
                .filter(file => file.fieldname === `images[${i}]`)
                .map(file => `/uploads/${file.filename}`);

          const newProduct = new Product({
              name,
              description,
              price,
              images
          });

          const savedProduct = await newProduct.save();
          savedProducts.push(savedProduct);
      }

      res.status(201).json({
          message: `${savedProducts.length} products added successfully!`,
          products: savedProducts
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


module.exports = { getProducts, addProducts };
