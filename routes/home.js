const path = require('path');
const express = require('express');
const router = express.Router();

const homeController = require('../controller/homeController');

router.get('/', homeController.getHome);

router.get('/women-sale', homeController.getWomenSale);

router.get('/sunglasses', homeController.getGlasses);

router.get('/summer-sale', homeController.getSummerSale);

module.exports = router;