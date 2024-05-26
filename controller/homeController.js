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

module.exports.getWomenSale = async (req, res, next) => {
    // res.send('ok');
    try {
        let products = await Product.find({ name: { $regex: 'women', $options: 'i' } }).sort({ price: 1 });
        console.log(products)
        res.render('shop/carousel', {
            products,
            isAdmin: req.user.isAdmin
        });
    }

    catch (err) {
        console.log(err);
    }
}

module.exports.getGlasses = async (req, res, next) => {
    // res.send('ok');
    try {
        let products = await Product.find({ name: { $regex: 'sunglasses', $options: 'i' } }).sort({ price: 1 });
        console.log(products)
        res.render('shop/carousel', {
            products,
            isAdmin: req.user.isAdmin
        });
    }

    catch (err) {
        console.log(err);
    }
}

module.exports.getSummerSale = async (req, res, next) => {
    // res.send('ok');
    try {
        let products = await Product.find({
            // name: { $regex: 'sunglasses', $options: 'i' },
            price: { $gte: 30, $lte: 60 }
        }).sort({ price: 1 }); // Ascending order
        console.log(products)
        res.render('shop/carousel', {
            products,
            isAdmin: req.user.isAdmin
        });
    }

    catch (err) {
        console.log(err);
    }
}