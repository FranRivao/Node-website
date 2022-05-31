const pool = require('../database');
const { encryptPassword } = require('../lib/auth');

const userFactory = async (amount) => {
    for (let i = 0; i < amount; i++) {
        const num = Math.floor(Math.random() * (3000 - 1)) + 1;
        const userData = {
            username: 'Usuario ' + num,
            fullname: 'Usuario ' + num,
            password: await encryptPassword('asdasdasd')
        };
        await pool.query('INSERT INTO users SET ?', [userData]);
    }
    console.log(amount, " usuarios creados");
}

const amountUsers = 3;
userFactory(amountUsers);