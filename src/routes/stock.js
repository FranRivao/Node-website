// Requirements
const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin } = require('../lib/auth')
const { getRequests, deleteStockRequest } = require('../lib/requests');
const item = require('../lib/items');
const stat = require('../lib/stadistics');

router.get('/', isLoggedIn, isAdmin, async (req, res) => {
    const items = await item.getItemsLimited(20);
    res.render('stock/list', { items });
});

router.post('/createItem', isLoggedIn, isAdmin, async (req, res) => {
    await item.createItem(req.body.name, req.body.price, req.body.amount);
    const i = await item.getItemByName(req.body.name);
    await stat.itemAction(i[0].id, req.user.id, 'Create');

    res.redirect('/stock');
});

router.post('/updateItem', isLoggedIn, isAdmin, async (req, res) => {
    const { id } = req.body;
    const { content } = req.body;
  
    await item.updateItem(req.body.field, content, req.body.id, id);

    res.redirect('/stock');
});

router.get('/deleteItem/:id', isLoggedIn, isAdmin, async (req, res) => {
    const { id } = req.params;
    await item.deleteItem(id);
    res.redirect('/stock');
});

router.get('/stadistics', isLoggedIn, isAdmin, async (req, res) => {
    const stats = await stat.getStadisticsLimited(20);
    res.render('stock/stadistics', { stats });
});

router.get('/requests', isLoggedIn, isAdmin, async (req, res) => {
    const request = await getRequests(10);
    res.render('stock/requests', { request });
});

router.post('/renew', isLoggedIn, isAdmin, async (req, res) => {
    const { id } = req.body;
    const { content } = req.body;

    await item.updateItem(req.body.field, content, req.body.id, id);
    await deleteStockRequest(id);
    res.redirect('/stock');
});

// Export
module.exports = router;