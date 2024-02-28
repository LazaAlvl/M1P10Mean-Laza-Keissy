var express = require('express');
var router = express.Router();

const { createDepense,getAllDepenses, updateDepense, deleteDepense } = require('../controllers/depenseController');


router.post('/create_depense', createDepense);
router.get('/index_depenses', getAllDepenses);
router.put('/update_depense/:id', updateDepense);
router.delete('/delete_depense/:id', deleteDepense);

module.exports = router;
