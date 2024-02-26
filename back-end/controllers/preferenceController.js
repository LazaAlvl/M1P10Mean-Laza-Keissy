const { json } = require('express');
const Preference = require('../models/preferenceModel');

module.exports.CreatePreference = async (req, res, next) => {
    const { id_client, id_service, etoile } = req.body;
    try {
        const Preferences = new Preference({
            id_service,
            id_client,
            etoile
        });
        await Preferences.save();
        return res.status(201).json('Preference registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports.GetPreferencealreadyhere = async (req, res, next) => {
    const serviceId = req.params.serviceId;
    const userId = req.params.userId;
    try {  
    const preferences =  await Preference.findOne({ id_service: serviceId, id_client: userId })
    if(preferences)
    {
     res.status(200).json(preferences);
    }else{
        res.status(404).json({ error: 'Preference not found' });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
