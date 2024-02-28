var express = require('express');
var router = express.Router();

const statsController = require('../controllers/statsController');

router.post('/nombre_reservations_jour', statsController.GetNombreReservationsJour);
router.post('/nombre_reservations_mois', statsController.GetNombreReservationsMois);
router.post('/chiffre_affaire_jour', statsController.GetChiffreAffaireJour);
router.post('/chiffre_affaire_mois', statsController.GetChiffreAffaireMois);

router.post('/benefice_mois', statsController.GetBeneficeMois);
router.post('/temps_moyenne_travail', statsController.GetTempsMoyenneTravailEmploye);


module.exports = router;