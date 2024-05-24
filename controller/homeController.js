module.exports.getHome = (req, res, next) => {
    res.render('home', {
        email : req.user.email,
        isAdmin : req.user.isAdmin,
        cartCnt : req.user.cart.products.length
    });
}

module.exports.getWomenSale = (req, res, next) => {
    res.send('ok');
}