const path = require('path');
const express = require('express');
const router = express.Router();
const MyPassport = require('../auth/passport');

const loginController = require('../controller/loginController')

router.get('/', loginController.getlogin);

// through documentation.
router.post('/',
    MyPassport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/profile');
    });

router.get('/facebook',
    MyPassport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    MyPassport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/profile');
    });

router.get('/google',
    MyPassport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
    MyPassport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/profile');
    });

module.exports = router;