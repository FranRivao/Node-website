// Requirements
const pool = require('../database');
const helpers = {};

helpers.verifyRequestExistence = async (requested) => {
    try {
        return await pool.query('SELECT * FROM stockrequests WHERE ?', {requested});
    } catch (e) {
        console.log(e);
    }
}

helpers.getRequests = async lim => {
    try {
        return pool.query('SELECT * FROM stockrequests LIMIT ?', [lim]);
    } catch (e) {
        console.log(e);
    }
}

helpers.addStockRequest = async (user_id, requested) => {
    try {
        await pool.query('INSERT INTO stockrequests SET ?', {user_id, requested});
    } catch (e) {
        console.log(e);
    }
}

helpers.renewStock = async (req, res) => {
    const { id } = req.body;
    const { content } = req.body;

    await item.updateItem(req.body.field, content, req.body.id, id);
    await this.deleteStockRequest()
}

helpers.deleteStockRequest = async id => {
    console.log(id);
    try {
        await pool.query('DELETE FROM stockrequests WHERE requested = ?', [id]);
    } catch (e) {
        console.log(e);
    }
}

// Export
module.exports = helpers;