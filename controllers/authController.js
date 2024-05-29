const db = require("../utils/db-client.util");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.loginAgent = (req, res) => {
  const { nom, matricule } = req.body;

  const query = 'SELECT * FROM agent_de_quartier WHERE nom = ? AND matricule = ?';

  db.query(query, [nom, matricule], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const agent = results[0];
    const token = jwt.sign({ id: idAgent_de_quartier.id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
  });
};
