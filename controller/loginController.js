const users = require("../model/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.getlogin = (req, res) => {
    if (req.user) {
        res.redirect('/home');
    }
    res.render('login')
}
