var express = require('express');
var router = express.Router();

const {GetNombreReservationsJour, GetNombreReservationsMois, GetChiffreAffaireMois, GetChiffreAffaireJour}= require('../controllers/statsController');

router.post('/nombre_reservations_jour', GetNombreReservationsJour);
router.post('/nombre_reservations_mois', GetNombreReservationsMois);
router.post('/chiffre_affaire_jour', GetChiffreAffaireJour);
router.post('/chiffre_affaire_mois', GetChiffreAffaireMois);