// Requirements
const pool = require('../database');
const helpers = {};

helpers.updateRole = async (id, role) => {
    try {
        await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
    } catch (e) {
        console.log(e);
    }
}

helpers.addRole = async (role) => {
    try {
        await pool.query('INSERT INTO roles SET ?', [{role}]);
    } catch (e) {
        console.log(e);
    }
}

helpers.deleteRole = async (id) => {
    try {
        await pool.query('DELETE * FROM roles WHERE id = ?', [{id}]);
    } catch (e) {
        console.log(e);
    }
}   

helpers.getUserRole = async (id) => {
    try {
        return await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    } catch (e) {
        console.log(e);
    }
}

helpers.getAllRoles = async () => {
    try {
        return await pool.query('SELECT * FROM roles');
    } catch (e) {
        console.log(e);
    }
}

// Export
module.exports = helpers;