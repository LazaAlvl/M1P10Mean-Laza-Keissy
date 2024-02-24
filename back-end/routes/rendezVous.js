var express = require('express');
var router = express.Router();
const RendezVous = require('../models/rendezVousModel');
const { GetRendezVous,CreateRendezVous, UpdateRendezVous, DeleteRendezVous, 
        GetRendezVousClient, EnvoyerRappels, GetRendezVousEmploye, 
        SuiviTachesCommissionJourEmploye, GetNombreReservationsJour, 
        GetNombreReservationsMois, GetChiffreAffaireMois, GetChiffreAffaireJour } = require('../controllers/rendezVousController');

/* CRUD RendezVous */

router.get('/index', GetRendezVous);
router.post('/create', CreateRendezVous);
router.put('/update/:id', UpdateRendezVous);
router.delete('/delete/:id',DeleteRendezVous);
router.get('/historic/:clientId',GetRendezVousClient);
router.get('/rappels/:clientId', EnvoyerRappels);
router.get('/employe_rdv/:employeId', GetRendezVousEmploye);
router.get('/suivi_taches_commission/:employeId', SuiviTachesCommissionJourEmploye);
router.get('/nombre_reservations_jour', GetNombreReservationsJour);
router.get('/nombre_reservations_mois', GetNombreReservationsMois);
router.get('/chiffre_affaire_mois', GetChiffreAffaireMois);
router.get('/chiffre_affaire_jour', GetChiffreAffaireJour);

module.exports = router;
