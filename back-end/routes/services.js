var express = require('express');
var router = express.Router();

const { GetService,CreateService, UpdateService, DeleteService, getPaginatedServices, getServiceDetails} = require('../controllers/serviceController');

/* CRUD service */

router.get('/index', GetService);
router.post('/create', CreateService);
router.put('/update/:id', UpdateService);
router.delete('/delete/:id',DeleteService);

router.get('/paginatedservices', getPaginatedServices);
router.get('/infos-service/:id', getServiceDetails);

module.exports = router;