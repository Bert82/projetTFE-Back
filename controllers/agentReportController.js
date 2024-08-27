const db = require("../utils/db-client.util");

const agentReportController = {};

agentReportController.findAll = async (req, res) => {
  try {
    const data = await db.promise().query("SELECT * FROM Rapport_agent");
    res.json(data);
  } catch (err) {
    console.error(err);
    return;
  }
};

agentReportController.create = async (req, res) => {
  const { garage, vehicule, nuisance, rapport, applicant_Id } = req.body;

  try {
    console.log("Valeurs reçues :", {
      garage,
      vehicule,
      nuisance,
      rapport,
      applicant_Id,
    });

    if (applicant_Id === undefined) {
      return res.status(400).json({ error: "L'ID de l'applicant est requis." });
    }

    const data = await db
      .promise()
      .query(
        "INSERT INTO Rapport_agent (garage, vehicule, nuisance, rapport, applicant_Id) VALUES (?, ?, ?, ?, ?)",
        [garage, vehicule, nuisance, rapport, applicant_Id]
      );

    console.log("Données insérées :", data);

    res
      .status(201)
      .json({ message: "le rapport à bien été créé", rapport: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur serveur." });
  }
};

agentReportController.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const [agentReport] = await db
      .promise()
      .query(
        "SELECT idRapport, garage, vehicule, nuisance, rapport, applicant_Id FROM Rapport_agent WHERE idRapport = ?",
        [id]
      );

    if (!agentReport) {
      return res.status(404).json({ message: "Demandeur non trouvé" });
    }

    res.json(agentReport);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }

};

agentReportController.suivi = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM Rapport_agent WHERE idRapport = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Rapport not found" });
    }

    const rapport = rows[0];
    const fields = ["garage", "vehicule", "nuisance"];
    const isValid = fields.every(
      (field) => rapport[field] !== null && rapport[field] !== ""
    );

    res.json({ isValid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

agentReportController.updateOne = async (req, res) => {
  const { id } = req.params;
  const { garage, vehicule, nuisance, rapport, applicant_Id } = req.body;

  try {
    console.log("Valeurs reçues pour la mise à jour :", {
      garage,
      vehicule,
      nuisance,
      rapport,
      applicant_Id,
    });

    // Vérifiez si l'ID du rapport est fourni
    if (!id) {
      return res.status(400).json({ error: "L'ID du rapport est requis." });
    }

    // Préparez la requête SQL pour la mise à jour
    const data = await db
      .promise()
      .query(
        "UPDATE Rapport_agent SET garage = ?, vehicule = ?, nuisance = ?, rapport = ?, applicant_Id = ? WHERE id = ?",
        [garage, vehicule, nuisance, rapport, applicant_Id, id]
      );

    console.log("Données mises à jour :", data);

    // Vérifiez si la mise à jour a affecté une ligne
    if (data[0].affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Le rapport avec cet ID n'existe pas." });
    }

    res.status(200).json({ message: "Le rapport a bien été mis à jour." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erreur serveur." });
  }

}

module.exports = agentReportController;
