const path = require('path');
const express = require('express');
const router = express.Router();

const homeController = require('../controller/homeController');

router.get('/', homeController.getHome);

router.get('/women-sale', homeController.getWomenSale);

module.exports = router;