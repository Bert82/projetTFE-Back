const db = require("../utils/db-client.util");
const agentController = {};

agentController.findAll = async (req, res) => {
  try {
    const data = await db.promise().query('SELECT * FROM Agent_de_quartier');
    res.json(data);
  } catch (err) {
    console.error(err);
    return;
  }
};

agentController.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const [agent] = await db.promise().query('SELECT nom, prenom, matricule FROM Agent_de_quartier WHERE idAgent_de_quartier = ?', [id]);
    if (!agent) {
      return res.status(404).json({ message: 'Demandeur non trouvé' });
    }

    res.json(agent);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }

  
  // db.query('SELECT...', (error, results) => {
// if (error) { return; }
// res.json(results)
// })

};

module.exports = agentController;
