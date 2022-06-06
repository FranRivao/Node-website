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
        const link = "https://img.freepik.com/vector-gratis/perfil-dibujo-logo-doodle-icono-aislado-sobre-fondo-oscuro_159242-1282.jpg";
        const result = await pool.query('INSERT INTO users SET ?', [userData]);
        
        userData.id = result.insertId;
        await pool.query('INSERT INTO img SET ?', {user_id: userData.id, link});
    }
    console.log(amount, " usuarios creados");
}

const amountUsers = 3;
userFactory(amountUsers);