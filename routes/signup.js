const path = require('path');
const express = require('express');
const router = express.Router();

const signupController = require('../controller/signupController');

router.get('/', signupController.getsignup);

router.post('/', signupController.postsignup);

module.exports = router;