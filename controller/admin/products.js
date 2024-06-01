const Product = require("../../model/product");

module.exports.getAddProduct = (req, res) => {
    console.log(req.user);
    res.render('admin/addProduct', {
        isAdmin: true,
        cartCnt: req.user.cart.products.length
    }
    )
}

module.exports.postAddProduct = async (req, res, next) => {
    const { name, price, imageUrl, description } = req.body;
    try {
        await Product.create({
            name,
            price,
            imageUrl,
            description,
            user_id: req.user._id
        })
        res.redirect('/admin/products');
    } catch (err) {
        next(err);
    }
}

module.exports.getProducts = async (req, res, next) => {
    try {
        let products = await Product.find({
            user_id: req.user._id
        });
        res.render('admin/products', {
            products,
            isAdmin: true,
            cartCnt: req.user.cart.products.length
        })
    } catch (err) {
        next(err)
    }
}

module.exports.geteditProduct = async (req, res, next) => {
    const { id } = req.query;
    // console.log(id);
    try {
        let products = await Product.find({ _id: id });
        // console.log(products);
        res.render('admin/editProducts', {
            isAdmin: true,
            product: products[0],
            cartCnt: req.user.cart.products.length
        })
    } catch (err) {
        next(err)
    }
}

module.exports.posteditProduct = async (req, res, next) => {
    const { name, price, imageUrl, description } = req.body;
    const { id } = req.query;
    try {
        let products = await Product.find({ _id: id });
        products = products[0];
        products.name = name;
        products.price = price;
        products.imageUrl = imageUrl;
        products.description = description;
        await products.save();
        res.redirect('/admin/products');
    } catch (err) {
        next(err)
    }
}

module.exports.getDeleteProduct = async (req, res, next) => {
    const { id } = req.query;
    try {
        await Product.deleteOne({ _id: id });
        res.redirect('/admin/products')
    } catch (err) {
        next(err)
    }
}

module.exports.getDetails = async (req, res, next) => {
    const { id } = req.query;
    try {
        let products = await Product.find({ _id: id });
        products = products[0];
        console.log(products);
        // res.redirect('/shop/addReview',{
        //     products,
        //     cartCnt: req.user.cart.products.length
        // });
        res.send('ok');
    } catch (err) {
        next(err)
    }
}