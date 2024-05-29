var express = require('express');
const controller = require('../controllers/agentReportController');

var router = express.Router();

router.get("", controller.findAll);
router.get("/:id", controller.findOne);
router.post("", controller.create);
//router.patch(":id", controller.updateOne);
//router.delete(":id", controller.delete);

module.exports = router;