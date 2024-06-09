const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) 
        {
            return res.sendStatus(401);
        }

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) 
            {
                return res.sendStatus(403);
            }
        
            req.user = user;
        next();
    });
};

const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.sendStatus(403);
        }
        
        next();
    };
};

module.exports = { authenticateToken, authorizeRole };