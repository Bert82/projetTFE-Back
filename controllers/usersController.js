const db = require("../utils/db-client.util");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const {
  validateEmail,
  validateMatricule,
  validatePassword,
  validateNom,
  validatePrenom
} = require('../validators/validators.js');

const usersController = {};

usersController.findAll = async (req, res) => {
    try {                                     
    
     const [data, ] = await db.promise().query('SELECT * FROM users u LEFT JOIN Applicant a on u.id = a.user_id'); 
      res.json(data);
    } catch (err) {
      console.error(err);
      return [];
    }
  };

usersController.create = async (req, res) => {
    const {
        nom,
        prenom, 
        matricule,
        email,
        password,
        role
    } = req.body

   try {
    console.log ("Valeurs reçue:", {
        nom,
        prenom, 
        matricule,
        email,
        password, 
        role
    });

    if (!validateNom(nom)) {
      return res.status(400).json({ message: "Le nom est invalide. Il doit contenir uniquement des lettres." });
  }
  if (!validatePrenom(prenom)) {
      return res.status(400).json({ message: "Le prénom est invalide. Il doit contenir uniquement des lettres." });
  }
  if (!validateMatricule(matricule)) {
      return res.status(400).json({ message: "Le matricule est invalide. Il doit être un nombre à 4 chiffres." });
  }
  if (!validateEmail(email)) {
      return res.status(400).json({ message: "Le format de l'adresse email est invalide." });
  }
  if (!validatePassword(password)) {
      return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères et une majuscule." });
  }
 
    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await db.promise().query('INSERT INTO users (nom, prenom, matricule, email, password, role) VALUES (?, ?, ?, ?, ?,?)', [nom, prenom, matricule, email, hashedPassword, role]);
    
    console.log("Données insérées :", data);

    res.status(201).json({ message: "L'utilisateur a été créé avec succès.", 
    users:  {
    id: data.insertId,
    nom: nom,
    prenom: prenom,
    matricule: matricule,
    email: email,
    password: hashedPassword,
    role: role
} });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Une erreur est survenue lors de la création de l'utilisateur." });
    } 
};


usersController.findOne = async (req, res) => {

    const { id } = req.params;
    
    try {
      const [users] = await db.promise().query('SELECT * FROM users u LEFT JOIN Applicant a on u.id = a.user_id LEFT JOIN Rapport_agent r on a.Id_applicant = r.applicant_Id LEFT JOIN CSR c ON a.Id_applicant = c.applicant_id WHERE id = ?', [id]);
      
      if (!users) {
        return res.status(404).json({ message: 'Demandeur non trouvé' });
      }
  
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
};

usersController.log = async (req, res) => {
    const { email, password } = req.body;
    console.log('Email:', email);
    console.log('Password:', password);

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) throw err;
        if (results.length === 0) return res.status(401).send('User not found');

        const user = results[0];
        console.log('User:', user);
        console.log('User role:', user.role); 
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            console.log('Is match:', isMatch);
            if (!isMatch) return res.status(401).send('Password incorrect');

            const token = jwt.sign({ id: user.id, role: user.role, nom: user.nom, prenom: user.prenom, email: user.email }, 'secretkey', { expiresIn: '24h' });
            res.json({ token, role: user.role  });
        });
    });
}

usersController.getCurrentUser = async (req, res) => {
  try {
      const user = req.user; 
      res.json(user);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur serveur' });
  }
};

usersController.suivi = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db
      .promise()
      .query('SELECT * FROM users u LEFT JOIN Applicant a on u.id = a.user_id LEFT JOIN Rapport_agent r on a.Id_applicant = r.applicant_Id LEFT JOIN CSR c ON a.Id_applicant = c.applicant_id WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Rapport not found" });
    }

    const rapport = rows[0];
    const fields = ["garage", "vehicule", "nuisance"];
    const isValid = fields.every(
      (field) => rapport[field] !== null && rapport[field] !== ""
    );

    const isCsrValid = rapport.decision !== null && rapport.decision !== "";

    res.json({ isValid, isCsrValid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};


  module.exports = usersController;