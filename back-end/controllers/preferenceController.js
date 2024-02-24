const { json } = require('express');
const Preference = require('../models/preferenceModel');

module.exports.CreatePreference = async (req, res, next) => {
    const { id_client, id_service, etoile } = req.body;
    try {
        const Preferences = new Preference({
            id_client,
            id_service,
            etoile
        });
        await Preferences.save();
        return res.status(200).json('Preference registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}