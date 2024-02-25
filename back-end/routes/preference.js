var express = require('express');
var router = express.Router();
const { CreatePreference, GetPreferencealreadyhere } = require('../controllers/preferenceController');

router.post('/create', CreatePreference);
router.get('/:serviceId/:userId', GetPreferencealreadyhere);

module.exports = router;