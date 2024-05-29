const express = require('express');
const mysql = require('mysql');
const router = require('./routes');

const app = express();

// Configuration de la connexion MySQL
const db= require("../utils/").dbClient;


// Utilisez le routeur des agents
app.use('/agents', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

