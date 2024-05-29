const db= require("../utils/db-client.util");


const mobiliteController = {};

mobiliteController.findAll = async (req, res) => {

  try {
    const data = await db.promise().query('SELECT nom, prenom, matricule FROM Mobilite');
    res.json(data);
  } catch (err) {
    console.error(err);
    return;
  }
  
};
 
  module.exports = mobiliteController;