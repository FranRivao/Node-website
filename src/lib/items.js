// Requirements
const pool = require('../database');
const { itemAction, deleteStadistic } = require('./stadistics');
const helpers = {};

helpers.getItemsLimited = async (LIMIT) => {
    try {
        return await pool.query('SELECT * FROM items LIMIT ?', [LIMIT])
    } catch (e) {
        console.log(e);
    }
}

helpers.getItem = async (id) => {
    try {
        return await pool.query('SELECT * FROM items WHERE id = ?', [id])
    } catch (e) {
        console.log(e);
    }
}

helpers.getItemStock = async (id) => {
    try {
        return await pool.query('SELECT stock FROM items WHERE id = ?', [id])
    } catch (e) {
        console.log(e);
    }
}

helpers.getItemByName = async (name) => {
    try {
        return await pool.query('SELECT * FROM items WHERE name = ?', [name])
    } catch (e) {
        console.log(e);
    }
}

helpers.createItem = async (name, price, amount) => {
    const data = {
        name,
        price,
        amount
    }
    try {
        await pool.query('INSERT INTO items SET ?', data);
    } catch (e) {
        console.log(e);
    }
}

helpers.updateName = async (name, id) => {
    try {
        await pool.query('UPDATE items SET name = ? WHERE id = ?', [name, id]);
    } catch (e) {
        console.log(e);
    }
}

helpers.updatePrice = async (price, id) => {
    try {
        await pool.query('UPDATE items SET price = ? WHERE id = ?', [price, id]);
    } catch (e) {
        console.log(e);
    }
}

helpers.updateAmount = async (amount, id) => {
    try {
        await pool.query('UPDATE items SET amount = ? WHERE id = ?', [amount, id]);        
    } catch (e) {
        console.log(e);
    }
}

helpers.updateItem = async (field, content, userid, id) => {
    switch (field) {
        case "n":
            // await itemAction(id, userid, 'Update');
            await helpers.updateName(content, id);
            break;
        
        case "a":
            // await itemAction(id, userid, 'Update');
            await helpers.updateAmount(content, id);  
            break;
        
        case "p":
            // await itemAction(id, userid, 'Update');
            await helpers.updatePrice(content, id);
            break;
    };
}

helpers.deleteItem = async (id) => {
    try {
        // await deleteStadistic(id);
        await pool.query('DELETE FROM cartItems WHERE item = ?', [id]);
        await pool.query('DELETE FROM items WHERE id = ?', [id]);
    } catch (e) {
        console.log(e);
    }
}

// Export
module.exports = helpers;