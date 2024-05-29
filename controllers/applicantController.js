const db= require("../utils/db-client.util");


const applicantController = {};

applicantController.findAll = async (req, res) => {

  try {
    const data = await db.promise().query('SELECT * FROM Applicant a LEFT JOIN Rapport_agent r on a.Id_applicant = r.applicant_Id');
    res.json(data);
  } catch (err) {
    console.error(err);
    return;
  }
};

applicantController.create = async (req, res) => {
  const {
    nom,
    prenom,
    dateNaissance,
    adresse,
    localite,
    numeroCartePMR,
    telephone,
    email
  } = req.body;

  
  if (!nom || !prenom || !dateNaissance || !adresse || !localite || !numeroCartePMR || !telephone || !email) {
    return res.status(400).json({ message: "Toutes les données obligatoires doivent être fournies." });
  }

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Le format de l'adresse email est invalide." });
  }

  try {
    console.log("Valeurs reçues :", {
      nom,
      prenom,
      dateNaissance,
      adresse,
      localite,
      numeroCartePMR,
      telephone,
      email
    });

    const data = await db.promise().query('INSERT INTO Applicant (nom, prenom, Date_naissance, adresse, localite, numero_de_carte, telephone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nom, prenom, dateNaissance, adresse, localite, numeroCartePMR, telephone, email]);
    
    console.log("Données insérées :", data);

    res.status(201).json({ message: "L'applicant a été créé avec succès.", applicant: data });
  } catch (err) {
    console.error(err);
    return;
  }
};



applicantController.findOne = async (req, res) => {

  const { id } = req.params;

  try {
    const [applicant] = await db.promise().query('SELECT * FROM Applicant a LEFT JOIN Rapport_agent r on a.Id_applicant = r.applicant_Id WHERE a.Id_applicant = ?', [id]);
    
    if (!applicant) {
      return res.status(404).json({ message: 'Demandeur non trouvé' });
    }

    res.json(applicant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
  
 
  module.exports = applicantController;