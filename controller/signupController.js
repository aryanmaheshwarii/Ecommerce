const Users = require("../model/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.getsignup = (req, res) => {
    res.render('signup');
};

module.exports.postsignup = async (req, res, next) => {
    const { email, password } = req.body;
    // console.log(username);
    // console.log(password);
    
    // Log the request body to debug
    console.log('Request body:', req.body);

    // Check if password is provided
    if (!password) {
        return res.status(400).send('Password is required');
    }
    
    try {
        let user = await Users.findOne({ email }).exec();
        if (!user) { // If user is not found, create a new user
            try {
                // Ensure password and saltRounds are correctly passed
                const hash = await bcrypt.hash(password, saltRounds); // Hash the password with salt rounds
                user = await Users.create({ email, password: hash, isAdmin: false });
                return res.redirect('/login');
            } catch (err) {
                return next(err);
            }
        } else {
            // User already exists
            return res.redirect('/signup');
        }
    } catch (err) {
        return next(err);
    }
};
