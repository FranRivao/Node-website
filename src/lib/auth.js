// Requirements
const bcrypt = require('bcryptjs');
const { code403 } = require('./errors');

// Constants
const helpers = {};

// Functions
helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    try {
        return await bcrypt.hash(password, salt);
    } catch (e) {
        console.log(e);
    }
}

helpers.matchPassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch(e) {
        console.log(e);
    }
}

helpers.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/signin');
}

helpers.isNotLoggedIn = (req,res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/profile');
}

helpers.isAdmin = (req, res, next) => {
    if (req.user.role == 2) {
        return next();
    }
    res.render('error', code403());
}

// Export
module.exports = helpers;