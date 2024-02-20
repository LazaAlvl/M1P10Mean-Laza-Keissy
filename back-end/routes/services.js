var express = require('express');
var router = express.Router();

const { GetService,CreateService, UpdateService, DeleteService, getPaginatedServices } = require('../controllers/serviceController');

/* CRUD service */

router.get('/index', GetService);
router.get('/create', CreateService);
router.put('/update/:id', UpdateService);
router.delete('/delete/:id',DeleteService);

router.get('/paginatedservices', getPaginatedServices);

module.exports = router;
