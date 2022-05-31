// Requirements
const pool = require('../database');
const helpers = {};

helpers.getStadisticsLimited = async (LIMIT) => {
    try {
        return await pool.query('SELECT * FROM stadistics LIMIT ?', [ LIMIT ]);
    } catch (e) {
        console.log(e);
    }
}

helpers.itemAction = async (id, user_id, fn) => {
    try {
        // MAL, ARREGLAR
        let item = await pool.query('SELECT * FROM items WHERE ?', {id});
        delete item[0].price;
        item = {
            item: item[0].id,
            amount: item[0].amount,
            action: fn,
            user_id: user_id
        }
        await pool.query('INSERT INTO stadistics SET ?', [item]);
    } catch (e) {
        console.log(e);
    }
}

helpers.deleteStadistic = async (id) => {
    try {
        pool.query('DELETE FROM stadistics WHERE item = ?', [id]);
    } catch (e) {
        console.log(e);
    }
}

module.exports = helpers;