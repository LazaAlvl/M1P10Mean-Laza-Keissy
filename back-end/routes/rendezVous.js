var express = require('express');
var router = express.Router();
const RendezVous = require('../models/rendezVousModel');

const { GetRendezVous,CreateRendezVous, UpdateRendezVous, DeleteRendezVous, GetRendezVousClient, EnvoyerRappels, GetRendezVousEmploye, SuiviTachesCommissionJourEmploye,getServiceDetailsrdv } = require('../controllers/rendezVousController');

/* CRUD RendezVous */

router.get('/index', GetRendezVous);
router.post('/create', CreateRendezVous);
router.put('/update/:id', UpdateRendezVous);
router.delete('/delete/:id',DeleteRendezVous);
router.get('/historic/:clientId',GetRendezVousClient);
router.get('/rappels/:clientId', EnvoyerRappels);
router.get('/employe_rdv/:employeId', GetRendezVousEmploye);
router.get('/suivi_taches_commission/:employeId', SuiviTachesCommissionJourEmploye);

router.get('/rdv/:id', getServiceDetailsrdv);

router.get('/all', async (req, res) => {
    try {
      const rendezVous = await RendezVous.find();
      return res.status(200).json(rendezVous);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
