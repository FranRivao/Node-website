// Requirements
const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin } = require('../lib/auth');
const { updateRole, getUserRole, getAllRoles } = require('../lib/roles');
const { getUserLimited, deleteUser } = require('../lib/users');
const pool = require('../database');
const passport = require('passport');


// Dashboard list route
router.get('/', isLoggedIn, isAdmin, async (req, res) => {
    const users = await getUserLimited(20);
    const roles = await getAllRoles();
    res.render('dashboard/list', { users, roles });
});


// Delete user route
router.get('/deleteuser/:id', isLoggedIn, isAdmin, async (req, res) => {
    const { id } = req.params;
    await deleteUser(id);
    res.redirect('/dashboard');
});


// Update role route
router.post('/updateRole', isLoggedIn, isAdmin, async (req, res) => {
    const { id } = req.body;
    const { role } = req.body;
    const userData = await getUserRole(id);
    if(userData[0]){
        if(userData[0].role != role){
            await updateRole(id, role);  
        } else {
            req.flash('error', 'The user already has that role');
        }
    } else {
        req.flash('error', 'The user does not exists');
    }
    res.redirect('/dashboard');
});


// Create user route
router.post('/createUser', isLoggedIn, isAdmin, passport.authenticate('local.signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/dashboard',
    failureFlash: true,
    session: false
}));

module.exports = router;