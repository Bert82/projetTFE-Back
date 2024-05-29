const mysql = require('mysql2');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'bertrand',
  password: 'baptiste2010',
  database: 'PMR'
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connexion à la base de données MySQL réussie');
});

module.exports = db;