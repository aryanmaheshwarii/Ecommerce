const { isAdmin } = require("../../middlewares/admin");
const Product = require("../../model/product");
// const reviews = require("../../model/reviews");
const Review = require("../../model/reviews");

module.exports.getProducts = async (req, res, next) => {
    try {
        let products = await Product.find({
            // user_id: req.user._id
        });
        res.render('shop/products', {
            products,
            isAdmin: req.user.isAdmin,
            cartCnt: req.user.cart.products.length
        })
    } catch (err) {
        next(err)
    }
}



module.exports.getBuyProducts = async (req, res, next) => {
    const { id } = req.query;
    console.log(id);
    try {
        let product = await Product.find({
            _id: id
        });
        product = product[0];
        console.log(product);
        res.render('shop/payment', {
            product,
            isAdmin: req.user.isAdmin,
            cartCnt: req.user.cart.products.length
        })
    } catch (err) {
        next(err)
    }
}

module.exports.getAddToCart = async (req, res, next) => {
    const { productId } = req.query;
    console.log(productId);

    req.user.addToCart(productId) // this addToCart function will make inside the user schema.
        .then((result) => {
            console.log(result);
            res.send('done');
        }).catch((err) => {
            next(err);
        })
}

module.exports.getDetails = async (req, res, next) => {
    const { id } = req.query;
    console.log(id);
    try {
        let product = await Product.find({
            _id: id
        });
        product = product[0];
        console.log(product);
        res.render('shop/buyOrAdd', {
            product,
            isAdmin: req.user.isAdmin,
            cartCnt: req.user.cart.products.length
        })
    } catch (err) {
        res.send(err);
    }
}

module.exports.getCart = async (req, res, next) => {
    req.user.populate('cart.products.id')
        .then((user) => {
            console.log(user.cart.products);
            let products = user.cart.products;
            let totalPrice = 0;
            products.forEach(element => {
                totalPrice += (element.id.price * element.quantity);
            });
            res.render('shop/cart', {
                products: user.cart.products,
                cartCnt: req.user.cart.products.length,
                totalPrice,
                isAdmin: req.user.isAdmin
            })
        }).catch((err) => {
            next(err);
        })
}

module.exports.getIncQty = (req, res, next) => {
    const { productId } = req.query;
    let userId = req.user._id;
    req.user.populate('cart.products.id') // isse user ka cart aa jayega mere pass.
        .then(async (user) => {
            // console.log('example', user.cart.products);
            let products = user.cart.products;
            let totalPrice = 0;
            products.forEach(element => {
                console.log('element', element);
                if (String(element.id._id) === productId) element.quantity += 1;
            });
            products.forEach(element => {
                totalPrice += (element.id.price * element.quantity);
            });
            console.log('price', totalPrice);
            console.log('quantity', products);
            try {
                await req.user.save();
            } catch (err) {
                return next(err);
            }
            res.send({
                msg: 'quantity updated',
                totalPrice
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports.getDecQty = async (req, res, next) => {
    const { productId } = req.query;
    let userId = req.user._id;
    req.user.populate('cart.products.id') // isse user ka cart aa jayega mere pass.
        .then(async (user) => {
            console.log(user.cart.products);
            let products = user.cart.products;
            let totalPrice = 0;
            products.forEach(element => {
                if (String(element.id._id) === productId) {
                    element.quantity -= 1;
                    // if (element.quantity <= 0)
                    //     element.quantity = 0;
                }
            });
            products.forEach(element => {
                totalPrice += (element.id.price * element.quantity);
            });
            try {
                await req.user.save();
            } catch (err) {
                return next(err);
            }
            res.send({
                msg: 'quantity updated',
                totalPrice
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports.getDelete = async (req, res, next) => {
    const { productId } = req.query;
    let userId = req.user._id;
    req.user.populate('cart.products.id') // isse user ka cart aa jayega mere pass.
        .then(async (user) => {
            console.log(user.cart.products);
            let products = user.cart.products;
            let totalPrice = 0;
            let newProducts = products.filter(element => {
                if (String(element.id._id) === productId) return false;
                return true;
            });
            newProducts.forEach(element => {
                totalPrice += (element.id.price * element.quantity);
            });
            user.cart.products = newProducts;
            try {
                await req.user.save();
            } catch (err) {
                return next(err);
            }
            res.send({
                msg: 'item deleted',
                totalPrice
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports.getSearch = async (req, res, next) => {
    console.log("checking")
    const query = req.query.query;
    console.log(query)
    try {
        // Perform search in MongoDB
        const results = await Product.find({ name: { $regex: query, $options: 'i' } });
        console.log(results)
        // Render search results page using Handlebars template
        res.render('shop/searchResults', { 
            products: results ,
            isAdmin: req.user.isAdmin,
            cartCnt: req.user.cart.products.length
        }); // Assuming you have a searchResults.hbs template
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports.getAddReview = async (req, res, next) => {
    const {id} = req.query;
    console.log(id)
    try{
        let product = await Product.find({
            _id : id
        })
        product = product[0];

        let productReviews = await Review.find({product_id:id}).populate('user_id');
        console.log("productReviews::",productReviews)
        res.render('shop/review',{product,productReviews})
    }
    catch(err){
        console.log(err);
    }
    

    // try {
    //     let newReview = await Review.find({
    //         product_id : id
    //     })
    // } 
    // catch (err) {
    //     next(err)
    // }

}


module.exports.postAddReview = async (req, res, next) => {
    const{productID, review} = req.body;
    let user = req.user;
    console.log(user)
    console.log(productID)
    console.log(review)
    let product = await Product.findOne({_id: productID})
    try{
        let newReview = await Review.create({
            product_id:productID,
            user_id:user,
            review:review
        })
        console.log(newReview)
        res.redirect(`/shop/addReview?id=${productID}`)
    }

    catch(err){

    }
}