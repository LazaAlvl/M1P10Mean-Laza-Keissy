var express = require('express');
var router = express.Router();
const RendezVous = require('../models/rendezVousModel');

const { GetRendezVous,CreateRendezVous, UpdateRendezVous, DeleteRendezVous, 
        GetRendezVousClient, EnvoyerRappels, GetRendezVousEmploye, 
        SuiviTachesCommissionJourEmploye, getServiceDetailsrdv,Update_effectueRendezVous,GetHoraireTravail } = require('../controllers/rendezVousController');


/* CRUD RendezVous */

router.get('/index', GetRendezVous);
router.post('/create', CreateRendezVous);
router.put('/update/:id', UpdateRendezVous);
router.delete('/delete/:id',DeleteRendezVous);

/* End CRUD RendezVous */

router.get('/historic/:clientId',GetRendezVousClient);
router.get('/rappels/:clientId', EnvoyerRappels);
router.get('/employe_rdv/:employeId', GetRendezVousEmploye);
router.get('/suivi_taches_commission/:employeId', SuiviTachesCommissionJourEmploye);
router.get('/rdv/:id', getServiceDetailsrdv);
router.get('/update_effectue/:id', Update_effectueRendezVous);
router.get('/horaire_travail/:employeId', GetHoraireTravail);

module.exports = router;
