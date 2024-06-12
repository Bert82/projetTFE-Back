var express = require('express');
const controller = require('../controllers/usersController');
//const { authenticateToken,authorizeRole } = require('../middleware/auth');

var router = express.Router();

router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.post("/", controller.create);
router.post('/login', controller.log);
//router.patch("/:id", controller.updateOne);
//router.delete("/:id", controller.delete);

module.exports = router;
