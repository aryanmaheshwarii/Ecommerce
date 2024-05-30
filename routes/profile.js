const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("userrrr:",req.user);
    if(!req.user) return res.redirect('/login')
    res.render('profile', {
        email : req.user.email,
        isAdmin : req.user.isAdmin,
        cartCnt : req.user.cart.products.length
    })
})

module.exports = router;