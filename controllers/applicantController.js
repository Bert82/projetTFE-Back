const db= require("../utils/db-client.util");


const applicantController = {};

applicantController.findAll = async (req, res) => {

  try {
    const data = await db.promise().query('SELECT * FROM Applicant a LEFT JOIN Rapport_agent r on a.Id_applicant = r.applicant_Id LEFT JOIN CSR c ON a.Id_applicant = c.applicant_id');
    
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
    email,
    user_id
  } = req.body;

 
 // if (!nom || !prenom || !dateNaissance || !adresse || !localite || !numeroCartePMR || !telephone || !email ||!user_id) {
 //   return res.status(400).json({ message: "Toutes les données obligatoires doivent être fournies." });
 // }

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Le format de l'adresse email est invalide." });
  }

  try {
    console.log("Valeurs reçues :", {
      dateNaissance,
      adresse,
      localite,
      numeroCartePMR,
      telephone,
       });

    const data = await db.promise().query('INSERT INTO Applicant (Date_naissance, adresse, localite, numero_de_carte, telephone, user_id) VALUES (?, ?, ?, ?, ?, ?)', [dateNaissance, adresse, localite, numeroCartePMR, telephone, user_id]);
    
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
    const [applicant] = await db.promise().query('SELECT * FROM Applicant a LEFT JOIN Rapport_agent r on a.Id_applicant = r.applicant_Id LEFT JOIN CSR c ON a.Id_applicant = c.applicant_id WHERE a.Id_applicant = ?', [id]);
    
    if (!applicant || applicant.length === 0) {
      return res.status(404).json({ message: 'Demandeur non trouvé' });
    }

    res.json(applicant[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
  
 
  module.exports = applicantController;