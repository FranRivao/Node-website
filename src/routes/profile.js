// Requirements
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {v4: uuidv4} = require('uuid'); 
const path = require('path');
const fs = require('fs')
const { getUserPasswordHash, getUserImg, changePassword, changeUsername, usernameExists, uploadUserImg } = require('../lib/users');
const { isLoggedIn, matchPassword, encryptPassword } = require('../lib/auth');

// Multer
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLowerCase())
    },
    destination: path.join(__dirname, '../public/uploads'),
});

const upload = multer({
    storage,
    dest: path.join(__dirname, '../public/uploads'),
    limits: {fileSize: 5000000},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|png|gif|jpg/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if(mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: el archivo debe ser una imagen");
    }
}).single('image');

// Routes
router.get('/', isLoggedIn, async (req, res) => {
    const img = await getUserImg(req.user.id);

    const user = {
        id: req.user.id,
        username: req.user.username,
        fullname: req.user.fullname,
        role: req.user.role == 2 ? "admin" : "user",
        img: img[0].link,
    }
    res.render('profile/index', {user});
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
        res.status(200).redirect('/profile');
    }
});

router.post('/uploadImg', isLoggedIn, upload, async (req, res) => {
    const id = req.user.id;
    const link = "http://localhost:4000/uploads/" + req.file.filename;
    let { actualLink } = req.body;
    actualLink = '../public' + actualLink.slice(21);

    try {
        fs.unlinkSync(path.join(__dirname, actualLink));
    } catch (e) {
        console.log(e);
    }
    await uploadUserImg(id, link);
    res.redirect('/profile');
});

// Exports
module.exports = router;