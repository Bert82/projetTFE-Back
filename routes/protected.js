const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/applicant', auth, (req, res) => {
    if (req.user.role !== 'applicant') {
        return res.status(403).send('Access denied.');
    }
    res.send('Welcome to the client page');
});

router.get('/agent', auth, (req, res) => {
    if (req.user.role !== 'agent') {
        return res.status(403).send('Access denied.');
    }
    res.send('Welcome to the agent page');
});

module.exports = router;
