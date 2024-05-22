const path = require('path');
const express = require('express');
const router = express.Router();

const productController = require('../controller/shop/products')

router.get('/products', productController.getProducts);
router.get('/', productController.getProducts);
router.get('/details', productController.getDetails);
router.get('/buy-now', productController.getBuyProducts);
router.get('/addtocart', productController.getAddToCart);
router.get('/cart', productController.getCart);
router.get('/increaseQty', productController.getIncQty);
router.get('/decreaseQty', productController.getDecQty);
router.get('/delete', productController.getDelete);

module.exports = router;