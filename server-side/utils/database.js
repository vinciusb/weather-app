const { pool } = require('../utils/config');

module.exports = {
    getMaxID: async () => {
        try {
            return (await pool.query("SELECT MAX(id) FROM users")).rows[0].max + 1;
        }
        catch(err) {
            throw err;
        }
    },

    getRows: async () => {
        try {
            return (await pool.query("SELECT * FROM users")).rows;
        }
        catch(err) {
            throw err;
        }
    },

    insertUser: async (id, signUp) => {
        try {
            await pool.query("INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)",
                [id, signUp.fName, signUp.lName, signUp.email, signUp.password]);
        }
        catch(err) {
            throw err;
        }
    },

    correctLogin: async (userInfo) => {
        try {
            const res = await pool.query("SELECT password FROM users WHERE email = $1",
                [userInfo.email]);
            if(res.rows.length !== 0 && res.rows[0].password === userInfo.password) {
                return true;
            }
            return false;
        }
        catch(err) {
            console.log("1 "  + err.message);
            throw err;
        }
    }
}