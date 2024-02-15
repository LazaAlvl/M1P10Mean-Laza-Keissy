var express = require('express');
var router = express.Router();

const { RegisterClient, LoginClient } = require('../controllers/userController');

/* GET users listing. */
router.post('/registerclient', RegisterClient);
router.post('/loginclient', LoginClient)

module.exports = router;
