const { json } = require('express');
const mongoose = require('mongoose');

module.exports.GetNombreReservationsJour = async (req, res, next) => {
    try {
        const dateInput = req.body.date; 
        const [year, month, day] = dateInput.split('-');

        const db = mongoose.connection;
        const result = await db.collection('nbre_reservation_jour_vw').find({ year: parseInt(year), month: parseInt(month), day: parseInt(day) }).toArray();

        console.log(result);

        return res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports.GetNombreReservationsMois = async (req, res, next) => {
    try {
        const { year, month } = req.body;
        
        const db = mongoose.connection;
        const result = await db.collection('nbre_reservation_mois_vw').find({ year: parseInt(year), month: parseInt(month) }).toArray();

        console.log(result);

        return res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports.GetChiffreAffaireJour = async (req, res, next) => {
    try {
        const dateInput = req.body.date; 
        const [year, month, day] = dateInput.split('-');

        const db = mongoose.connection;
        const result = await db.collection('chiffre_affaire_jour_vw').find({ year: parseInt(year), month: parseInt(month), day: parseInt(day) }).toArray();

        console.log(result);

        return res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports.GetChiffreAffaireMois = async (req, res, next) => {
    try {
        const { year, month } = req.body;
        
        const db = mongoose.connection;
        const result = await db.collection('chiffre_affaire_mois_vw').find({ year: parseInt(year), month: parseInt(month) }).toArray();

        console.log(result);

        return res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.GetBeneficeMois = async (req, res, next) => {
    try {
        const { year} = req.body;
        
        const db = mongoose.connection;
        const result = await db.collection('benefice_par_mois_vw').find({ year: parseInt(year)}).toArray();

        console.log(result);

        return res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};