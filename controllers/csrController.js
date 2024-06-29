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

 
  

 
  module.exports = csrController;