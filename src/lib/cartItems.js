// Requirements
const pool = require('../database');
const { getItemsLimited, updateAmount } = require('./items');
const { itemAction } = require('./stadistics');
const helpers = {};

// Functions 
// General Functions
helpers.getUserCartItems = async (user_id) =>{
    try {
        let items = await pool.query('SELECT * FROM cartItems WHERE ?', {user_id});
        items.forEach(async (i) => {
            let id = i.item;
            let obj = await pool.query('SELECT name FROM items WHERE id = ?', [id]);
            i.item = obj[0].name;
        });
        return items;
    } catch (e) {
        console.log(e);
    }
}

const getCartItem = async (item, user_id) => {
    try {
        return await pool.query('SELECT * FROM cartItems WHERE item = ? AND user_id = ?', [item, user_id]);
    } catch (e) {
        console.log(e);
    }
}

helpers.cartItemsAmount = async (amount, cartSpace) => {
    cartSpace -= amount;
    return cartSpace < 0 ? false : true;
}

helpers.calculatePrice = async (items, cart) => {
    let price = 0;
    items.forEach((i) => {
        cart.forEach((c) => {
            if (i.id == c.item) {
                price += c.amount * i.price;
            }
        });
    });
    return price;
}

// Add Items
const addItemsToCart = async (item, amount, user_id) => {
    try {
        await pool.query('INSERT INTO cartItems SET ?', {item, amount, user_id});
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

helpers.addItemProcess = async (item, items, addedAmount, user_id) => {
    let valid = true;

    if (items !== []) {
        items.forEach(async (i) => {
            if (i.item == item && valid) {
                valid = false;
            }
        });
    }

    if (!valid) {
        let repeatedItem = await getCartItem(item, user_id);
        addedAmount = parseFloat(addedAmount);
        const finalAmount = addedAmount + repeatedItem[0].amount;
        
        await helpers.deleteItemFromCart(repeatedItem[0].id);
        return await addItemsToCart(item, finalAmount, user_id);
    } 
    else {
        return await addItemsToCart(item, addedAmount, user_id);
    }
}

// // Update Items
// const updateCartItem = (item, ) => {

// }

// Delete Items
helpers.deleteItemFromCart = async (id) => {
    try {
        await pool.query('DELETE FROM cartItems WHERE id = ?', [id]);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

helpers.deleteAllItemsFromCart = async (user_id) => {
    try {
        await pool.query('DELETE FROM cartItems WHERE user_id = ?', [user_id]);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

// Buy Items
helpers.buyItems = async (cartItems, user_id) => {
    const items = await getItemsLimited(20);
    let validPurchase = true,
        amount;

    items.forEach(i => {
        cartItems.forEach(c => {
            if ((c.item == i.name || c.item == i.id) && validPurchase) {
                validPurchase = c.amount <= i.amount ? true : false;
            }
        });
    });

    if (validPurchase) {
        items.forEach(i => {
            cartItems.forEach(async (c) => {
                if (c.item == i.name || c.item == i.id) {
                    amount = i.amount - c.amount;
                    await updateAmount(amount, i.id);
        //             await itemAction(i.id, user_id, 'Purchase');
                }
            });
        });
    }

    return validPurchase;
}

// Exports
module.exports = helpers;