var express = require('express');
const controller = require('../controllers/agentController');
//const jwtMiddleware = require('../middleware/auth');
const { authenticateToken,authorizeRole } = require('../middleware/auth');


var router = express.Router();

router.get("/", controller.findAll);
router.get("/:id", authenticateToken, authorizeRole('agent'), controller.findOne);
//router.post("/", controller.create);
//router.patch("/:id", controller.updateOne);
//router.delete("/:id", controller.delete);

module.exports = router;
