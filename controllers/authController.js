/*const db = require("../utils/db-client.util");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authController = {};

authController.login = async(req, res) => {
  const { email, password } = req.body;

  const [user] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

  if (!user) {
      return res.status(401).send('user not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
      return res.status(401).send('Invalid password');
  }

  const token = jwt.sign({ id: user.id, role: user.role }, 'secretkey', { expiresIn: '24h' });

  res.json({ token });


};

module.exports = authController;*/