const db= require("../utils/db-client.util");


const mobiliteController = {};

mobiliteController.findAll = async (req, res) => {

  try {
    const data = await db.promise().query('SELECT * FROM Mobilite');
    res.json(data);
  } catch (err) {
    console.error(err);
    return;
  }
  
};

mobiliteController.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const [agentReport] = await db
      .promise()
      .query(
        "SELECT * FROM Mobilite WHERE idMobilite = ?",
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


mobiliteController.create = async (req, res) => {
  const { reponse, date_reponse, applicant_Id } = req.body;

  try {
    console.log("Valeurs reçues :", {
      reponse,
      date_reponse,
      applicant_Id,
    });

    if (applicant_Id === undefined) {
      return res.status(400).json({ error: "L'ID de l'applicant est requis." });
    }

    const data = await db
      .promise()
      .query(
        "INSERT INTO Mobilite (reponse, date_reponse, applicant_Id) VALUES (?, ?, ?)",
        [reponse, date_reponse, applicant_Id]
      );

    console.log("Données insérées :", data);

    res
      .status(201)
      .json({ message: "la réponse à bien été créé", rapport: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
};


 
  module.exports = mobiliteController;