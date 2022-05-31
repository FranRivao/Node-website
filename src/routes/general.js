const express = require('express');
const router = express.Router();
const { code404 } = require('../lib/errors');

// Index route
router.get('/', (req, res) => {
    res.render('index');
});


// Not existing routes route
router.get('/:d', (req, res) => {
    res.render('error', code404());
});


module.exports = router;