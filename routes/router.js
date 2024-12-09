// routers/productRouter.js
const express = require('express');
const multer = require('multer');
const { getProducts, addProducts } = require('../controllers/product_controler');
const { createOrder } = require('../controllers/checkout_controller');


const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.get('/products', getProducts); 
router.post('/products', upload.any(), addProducts);

//checkout

router.post('/checkout', createOrder);

module.exports = router;
