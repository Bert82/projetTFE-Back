var express = require('express');
const controller = require('../controllers/authController');

var router = express.Router();


router.get("/", controller.loginAgent);


module.exports = router;