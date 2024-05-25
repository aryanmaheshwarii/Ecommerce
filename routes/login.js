const path = require('path');
const express = require('express');
const app = express();
const router = express.Router();
const MyPassport = require('../auth/passport');
const loginController = require('../controller/loginController')
// Require the connect-flash package
const flash = require('connect-flash');

// Initialize connect-flash
app.use(flash());

router.get('/', loginController.getlogin);

// through documentation.
router.post('/',
    MyPassport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/home');
    });

router.get('/facebook',
    MyPassport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    MyPassport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/home');
    });

router.get('/google',
    MyPassport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
    MyPassport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/home');
    });

module.exports = router;