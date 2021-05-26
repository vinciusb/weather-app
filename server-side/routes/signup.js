const express = require('express');
const dt_base = require('../utils/database');
const router = express.Router();

router.get('/', (req, res, next) => {
    dt_base.getRows()
        .then(rows => res.status(200).json(rows));
});

router.put('/', (req, res, next) => {
    const signUp = req.body;
    dt_base.getMaxID()
        .then(id => dt_base.insertUser(id, signUp))
        .then(() => res.status(201).json(signUp))
        .catch(error => {
            var msg;
            if(error.constraint === 'users_first_name_last_name_idx') msg = 'This name has been already registered.';
            else if(error.constraint === 'users_email_key') msg = 'Email already in use.';
            else if(error.constraint === 'users_password_key') msg = 'Password already in use.';
            else throw error;
            res.status(409).send(msg);
        });
});

module.exports = router;