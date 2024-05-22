// i will create all the streategy here.. 1. local, 2. facebook, 3. google ..
const passport = require("passport"); // to create streategy.
const User = require("../model/user");

const LocalStrategy = require('passport-local');
// LOCAL STREATEGY... --> documentation.
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async function (email, password, done) {
        try {
            let user = await User.findOne({ email: email })
            if (!user) { return done(null, false); }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

const FacebookStrategy = require('passport-facebook');
// FACEBOOK STREATEGY --> documentation.
passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/login/auth/facebook/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        // console.log(profile)
        try {
            let user = await User.findOne({
                fbID: profile.id
            })
            if (user) return cb(null, user);
            user = await User.create({
                fbAccessToken: accessToken,
                fbID: profile.id,
                email: profile.displayName,
                isAdmin: false
            })
            cb(null, user)
        } catch (err) {
            cb(err, false)
        }
    }
));

const GoogleStrategy = require('passport-google-oauth20').Strategy;
// GOOGLE STRATEGY ...
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/login/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        // console.log(profile)
        try {
            let user = await User.findOne({
                googleID: profile.id
            })
            if (user) return cb(null, user);
            user = await User.create({
                googleAccessToken: accessToken,
                googleID: profile.id,
                email: profile.displayName,
                isAdmin: false
            })
            cb(null, user)
        } catch (err) {
            cb(err, false)
        }
    }
));

// jbtk user login rhega tbtk session rhinge jese hi user logout hoga session will distroy --> ye sb handel krne ka kaam serialize and deserialze function ka kaam hai.
// to handle persistent login session. --> if user is login --> doesn't ask user to login again --> see him profile directly.
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(
    async function (id, done) {
        try {
            let user = await User.findById(id);
            if (!user) return done(null, false);
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    });

module.exports = passport;
