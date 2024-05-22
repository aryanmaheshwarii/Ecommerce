const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose')
const session = require('express-session')
const MyPassport = require('./auth/passport');
const MongoStore = require('connect-mongo'); // server restart hone pr profile khud se logout nh hoye
const hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DB_PATH
  })
}))

app.get('/', (req, res) => {
  res.redirect('/login')
})

// for serialize and deserialize function ...
app.use(MyPassport.initialize());
app.use(MyPassport.session());

const { isAdmin } = require('./middlewares/admin')
app.use('/signup', require('./routes/signup'))
app.use('/login', require('./routes/login'))
const{isLoggedIn} = require('./middlewares/isLoggedIn')
app.use(isLoggedIn) // agar user logged in hai tbhi vo aage jayega.
app.use('/profile', require('./routes/profile'))
app.use('/admin', isAdmin, require('./routes/admin'))
app.use('/shop', require('./routes/shop'))

app.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
}); // only copy paste documentation.

mongoose.connect(process.env.DB_PATH)
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`)
    })
  })