// Requirements
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const { encryptPassword, matchPassword } = require('./auth');

// Sign up
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    newUser.password = await encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));


// Local Sign in
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
    const data = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    
    if (data.length > 0) {
        const user = data[0];
        const validPassword = await matchPassword(password, user.password);
        validPassword ? done(null, user) : done(null, false, req.flash('error', 'Incorrect password'));
    } else {
        return done(null, false, req.flash('error', 'The username/password is incorrect'))
    }
}));

// Google Sign In
const GOOGLE_CLIENT_ID = "1039526219850-of94s76ru7g0f1kevbto151otsfc492t.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(null, profile);
    // });
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// User serialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});


// User deserialization
passport.deserializeUser(async (id, done) => {
    const data = await pool.query('SELECT * FROM users WHERE ID = ?', [id]);
    done(null, data[0]);
});