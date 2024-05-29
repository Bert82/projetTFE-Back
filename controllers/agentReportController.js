const db= require("../utils/db-client.util");

const agentReportController = {};

agentReportController.findAll = async (req, res) => {

  try {
    const data = await db.promise().query('SELECT * FROM Rapport_agent');
    res.json(data);
  } catch (err) {
    console.error(err);
    return;
  }
};

agentReportController.create = async (req, res) => {
  const {
    garage,
    vehicule,
    nuisance,
    rapport,
    applicant_Id
  } = req.body;

  try {
   
    console.log("Valeurs reçues :", {
    garage,
    vehicule,
    nuisance,
    rapport,
    applicant_Id
    });

    if (applicant_Id === undefined) {
      return res.status(400).json({ error: "L'ID de l'applicant est requis." });
    }

    const data = await db.promise().query('INSERT INTO Rapport_agent (garage, vehicule, nuisance, rapport, applicant_Id) VALUES (?, ?, ?, ?, ?)', [garage, vehicule, nuisance, rapport, applicant_Id]);
    
    console.log("Données insérées :", data);

    res.status(201).json({ message: "le rapport à bien été créé", rapport: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
};

    agentReportController.findOne = async (req, res) => {

      const { id } = req.params;
    
      try {
        const [agentReport] = await db.promise().query('SELECT idRapport, garage, vehicule, nuisance, rapport, applicant_Id FROM Rapport_agent WHERE idRapport = ?', [id]);
        
        if (!agentReport) {
          return res.status(404).json({ message: 'Demandeur non trouvé' });
        }
    
        res.json(agentReport);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
      }

    };



  module.exports = agentReportController;