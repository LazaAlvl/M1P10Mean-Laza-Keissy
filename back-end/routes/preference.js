var express = require('express');
var router = express.Router();
const { CreatePreference } = require('../controllers/preferenceController');

router.post('/create', CreatePreference);

module.exports = router;