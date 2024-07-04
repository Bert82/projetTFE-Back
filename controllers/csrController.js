const db= require("../utils/db-client.util");


const csrController = {};

csrController.findAll = async (req, res) => {

  try {
    const data = await db.promise().query('SELECT * FROM CSR');
    res.json(data);
  } catch (err) {
    console.error(err);
    return;
  }
};

  csrController.create = async (req, res) => {
    const {
      date_csr,
      decision, 
      remarque, 
      applicant_Id
    } = req.body;

    try {
      console.log("valeurs reçues:",{
        date_csr,
        decision,
        remarque,
        applicant_Id
      });

      if (applicant_Id === undefined) {
        return res.status(400).json({ error: "L'ID de l'applicant est requis." });
      }
  
      const data = await db.promise().query('INSERT INTO CSR (date_csr, decision, remarque, applicant_Id) VALUES (?, ?, ?, ?)', [date_csr, decision, remarque, applicant_Id]);
      
      console.log("Données insérées :", data);
  
      res.status(201).json({ message: "le rapport à bien été créé", rapport: data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erreur serveur." });
    }

  };

  csrController.findOne = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [agentReport] = await db
        .promise()
        .query(
          "SELECT * FROM CSR WHERE idCSR = ?",
          [id]
        );
  
      if (!agentReport) {
        return res.status(404).json({ message: "rapport non trouvé" });
      }
  
      res.json(agentReport);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  
  };


  csrController.suivi = async (req, res) => {
    const { id } = req.params;

    try {
        // Récupérer le rapport CSR
        const [rowsCSR] = await db
            .promise()
            .query("SELECT * FROM CSR WHERE idCSR = ?", [id]);

        if (rowsCSR.length === 0) {
            return res.status(404).json({ message: "Rapport not found" });
        }

        const rapportCSR = rowsCSR[0];

        // Récupérer les informations de l'applicant lié au CSR (exemple : jointure avec la table Applicant)
        const [rowsApplicant] = await db
            .promise()
            .query("SELECT * FROM Applicant WHERE id_applicant = ?", [rapportCSR.applicant_Id]);

        if (rowsApplicant.length === 0) {
            return res.status(404).json({ message: "Applicant not found" });
        }

        const applicant = rowsApplicant[0];

        // Vérifier la validité du rapport CSR
        const fields = ["decision"];
        const isValid = fields.every(
            (field) => rapportCSR[field] !== null && rapportCSR[field] !== ""
        );

        // Retourner les informations du rapport CSR et de l'applicant
        res.json({ isValid, rapportCSR, applicant });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
    
  };

 
  

 
  module.exports = csrController;