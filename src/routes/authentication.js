// Requirements
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// Sign up routes
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));


// Sign in routes
router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/signin/google', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('google', { scope: ['email', 'profile']})(req, res, next);
});

router.get('/google/callback', 
    passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
}));

// Logout routes
router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

// Export
module.exports = router;