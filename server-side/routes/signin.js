const express = require('express');
const dt_base = require('../utils/database');
const router = express.Router();

router.get('/', (req, res, next) => {
    const userInfo = {
        email: req.query.email,
        password: req.query.pwd
    };

    dt_base.correctLogin(userInfo)
        .then(exists => exists ? 
            res.status(200).json(userInfo) : res.status(401).send('User infos aren\'t right.'));
});

module.exports = router;