// Requirements
const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const { getUserPasswordHash, changePassword, changeUsername, usernameExists } = require('../lib/users');
const { matchPassword, encryptPassword } = require('../lib/auth');

router.get('/', isLoggedIn, (req, res) => {
    const user = {
        id: req.user.id,
        username: req.user.username,
        fullname: req.user.fullname,
        role: req.user.role == 2 ? "admin" : "user",
    }
    res.render('profile', {user});
})

router.post('/changePassword', isLoggedIn, async (req, res) => {
    const { id } = req.user;
    const { actual_password } = req.body;
    let { password } = req.body;

    const passHash = await getUserPasswordHash(id);
    const validPassword = await matchPassword(actual_password, passHash[0].password);
    const isEqual = await matchPassword(password, passHash[0].password);

    if(validPassword && !isEqual){
        try {
            password = await encryptPassword(password);
            await changePassword(id, password);
            res.redirect('/logout')
        } catch (e) {
            console.log(e);
        }
    }
});

router.post('/changeUsername', isLoggedIn, async (req, res) => {
    const { id } = req.user;
    const { password } = req.body;
    const { username } = req.body;

    const passHash = await getUserPasswordHash(id);
    const exists = await usernameExists(username);
    const validPassword = await matchPassword(password, passHash[0].password);

    if(validPassword && !exists){
        try {
            await changeUsername(id, username);
            res.redirect('/logout')
        } catch (e) {
            console.log(e);
        }
    } else {
        req.flash('error', 'The password is incorrect or the username is already in use');
        res.status(200).redirect('/profile')
    }
});

// Exports
module.exports = router;