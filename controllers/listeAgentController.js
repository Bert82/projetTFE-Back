const db = require("../utils/db-client.util");

const listeAgentController = {};

listeAgentController.findAll = async (req, res) => {
    try {                                     
     const [data, ] = await db.promise().query('SELECT * FROM liste_agent'); 
    
      res.json(data);
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  listeAgentController.findOne = async (req, res) => {

    const { id } = req.params;
  
    try {
      const [listeAgent] = await db.promise().query('SELECT * FROM liste_agent WHERE id = ?', [id]);
      
      if (!listeAgent) {
        return res.status(404).json({ message: 'agent non trouvé' });
      }
  
      res.json(listeAgent);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur serveur' });
    }

  };
  
    listeAgentController.create = async (req, res) => {
      const {
        
        nom,
        prenom,
        matricule,
        role
      } = req.body;
  
      try {
        console.log("valeurs reçues:",{
            
            nom,
            prenom,
            matricule,
            role
        });
    
        const data = await db.promise().query('INSERT INTO liste_agent (nom, prenom, matricule, role) VALUES (?, ?, ?, ?)', [nom, prenom, matricule, role]);
        
        console.log("Données insérées :", data);
    
        res.status(201).json({ message: "l'agent a bien été ajouté à la liste", agent: data });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erreur serveur." });
      }
  
    };



    listeAgentController.delete = async (req, res) => {
        const { id } = req.params;
      
        try {
          const [result] = await db.promise().query('DELETE FROM liste_agent WHERE id = ?', [id]);
      
          if (result.affectedRows === 0) {
            return res.status(404).json({ error: "L'agent n'a pas été trouvé." });
          }
      
          console.log("Données supprimées :", result);
      
          res.status(200).json({ message: "L'agent a bien été supprimé de la liste" });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Erreur serveur." });
        }
      };
      

  module.exports = listeAgentController;