const { json } = require('express');
const RendezVous = require('../models/rendezVousModel');
const User = require('../models/userModel');
const Service = require('../models/serviceModel');

module.exports.GetRendezVous = async (req, res, next) => {
    try {
        const rendezVous = await RendezVous.find()
            .populate('id_employé', 'firstname lastname')
            .populate('id_client', 'firstname lastname')
            .populate('id_service', 'name price');
        console.log(rendezVous);
        return res.status(200).json(rendezVous);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports.CreateRendezVous = async (req, res, next) => {
    const { id_client, id_employe, id_service, date, etat } = req.body;
    try {
        const rendezVous = new RendezVous({
            id_client,
            id_employe,
            id_service,
            date,
            etat
        });
        await rendezVous.save();
        return res.status(200).json('Rendez-vous registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports.UpdateRendezVous = async (req, res, next) => {
    try {
        const rendezVous = await RendezVous.findById(req.params.id);
        if (rendezVous) {
            const updatedRendezVous = await RendezVous.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            return res.status(200).json({ message: 'Rendez-vous updated successfully' });
        } else {
            return res.status(404).json({ message: 'Rendez-vous not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports.DeleteRendezVous = async (req, res, next) => {
    try {
        const rendezVousId = req.params.id;
        const rendezVous = await RendezVous.findById(rendezVousId);
        if (rendezVous) {
            const deletedRendezVous = await RendezVous.findByIdAndDelete(rendezVousId);
            return res.status(200).json({ message: 'Rendez-vous deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Rendez-vous not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports.getServiceDetailsrdv = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        const employee = await User.find({ role: 'Employee' });

        if(service && employee){
            return res.json({service,employee});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to get service details' });
    }
};
