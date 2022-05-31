// Requirements
const pool = require('../database');

const helpers = {};

helpers.getUserLimited = async (LIMIT) => {
    try {
        return await pool.query('SELECT * FROM users LIMIT ?', [ LIMIT ]);
    } catch (e) {
        console.log(e);
    }
}

helpers.getAmountUsers = async () => {
    try {
        return await pool.query('COUNT * FROM users');
    } catch (e) {
        console.log(e);
    }
}

helpers.getUserPasswordHash = async (id) => {
    try {
        return await pool.query('SELECT password FROM users WHERE id = ?', [id]);
    } catch (e) {
        console.log(e);
    }
}

helpers.usernameExists = async (username) => {
    try {
        const res = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        return res != "" ? true : false;
    } catch (e) {
        console.log(e);
    }
}

helpers.changePassword = async (id, password) => {
    try {
        await pool.query('UPDATE users SET password = ? WHERE id = ?', [password, id])
    } catch (e) {
        console.log(e);
    }
}

helpers.changeUsername = async (id, username) => {
    try {
        await pool.query('UPDATE users SET username = ? WHERE id = ?', [username, id])
    } catch (e) {
        console.log(e);
    }
}

helpers.deleteUser = async (id) => {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
}

// Export
module.exports = helpers;