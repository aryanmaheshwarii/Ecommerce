const path = require('path');
const express = require('express');
const router = express.Router();

const productController = require('../controller/admin/products');

router.get('/add-product', productController.getAddProduct);

router.post('/add-product', productController.postAddProduct);

router.get('/products', productController.getProducts);

router.get('/edit', productController.geteditProduct);

router.post('/edit', productController.posteditProduct);

router.get('/delete', productController.getDeleteProduct);

module.exports = router;