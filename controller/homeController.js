const Product = require("../model/product");

module.exports.getHome = async (req, res, next) => {
    try {
        let products = await Product.find({}).limit(9);
        console.log(products);
        res.render('home', {
            email: req.user.email,
            isAdmin: req.user.isAdmin,
            cartCnt: req.user.cart.products.length,
            products
        });
    } catch (err) {
        next(err)
    }
}

module.exports.getWomenSale = (req, res, next) => {
    res.send('ok');
}