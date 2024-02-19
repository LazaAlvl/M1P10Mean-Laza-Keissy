var express = require('express');
var router = express.Router();

const { GetService,CreateService, UpdateService, DeleteService } = require('../controllers/serviceController');

/* CRUD service */

router.get('/index', GetService);
router.post('/create', CreateService);
router.put('/update/:id', UpdateService);
router.delete('/delete/:id',DeleteService);

module.exports = router;
