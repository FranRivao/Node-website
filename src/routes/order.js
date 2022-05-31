const express = require('express');
const router = express.Router();
const { code500 } = require('../lib/errors');
const { isLoggedIn } = require('../lib/auth');
const { getItemsLimited } = require('../lib/items');
const { addStockRequest, verifyRequestExistence,  } = require('../lib/requests');
const cartItems = require('../lib/cartItems');

router.get('/', isLoggedIn, async (req, res) => {
    const items = await getItemsLimited(20);
    const cart = await cartItems.getUserCartItems(req.user.id);
    const price = await cartItems.calculatePrice(items, cart);
    
    res.render('order/list', {items, cart, price});
});

router.post('/addToCart', isLoggedIn, async (req, res) => {
    const { id } = req.user;
    const items = await cartItems.getUserCartItems(id);
    
    const { item } = req.body;
    const { amount } = req.body;
    const { space } = req.body;

    if (await cartItems.cartItemsAmount(amount, space)) {
        await cartItems.addItemProcess(item, items, amount, id) ? res.redirect('/order') : res.render('error', code500());
    } else {
        req.flash('error', "You don't have enough space");
        res.redirect('/order');
    }
});

router.get('/buy', isLoggedIn, async (req, res) => {
    const { id } = req.user;
    const items = await cartItems.getUserCartItems(id);
    
    await cartItems.buyItems(items, id) ? await cartItems.deleteAllItemsFromCart(id) : req.flash('error', "There isn't that amount, try again later");
    res.redirect('/order');
});

router.post('/stockRequest', isLoggedIn, async (req, res) => {
    const { id } = req.user;
    const { item } = req.body;

    const verification = await verifyRequestExistence(item);

    if (!verification[0]) {
        console.log(id, item);
        await addStockRequest(id, item);
    }
    
    res.redirect('/order');
});

router.get('/deleteItem/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await cartItems.deleteItemFromCart(id) ? res.redirect('/order') : res.render('error', code500());
});

module.exports = router;