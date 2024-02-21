const { json } = require('express');
const RendezVous = require('../models/rendezVousModel');

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
    const { id_client, id_employé, id_service, date, etat } = req.body;
    try {
        const rendezVous = new RendezVous({
            id_client,
            id_employé,
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

module.exports.GetRendezVousClient = async (req, res, next) => {
    try {
        const clientId = req.params.clientId;

        const rendezVousClient = await RendezVous.find({ id_client: clientId })
            .populate('id_employé', 'firstname lastname')
            .populate('id_service', 'name price')
            .exec();

        return res.status(200).json(rendezVousClient);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports.EnvoyerRappels = async (req, res, next) => {
    try {
        const clientId = req.params.clientId;
        const dateActuelle = new Date();
        dateActuelle.setHours(dateActuelle.getHours() + 3);
        const dateLimiteRappel = new Date(dateActuelle.getTime() + 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000);
        console.log(dateLimiteRappel);
        const rendezVousClient = await RendezVous.find({ id_client: clientId }).populate('id_service', 'name');

        const rendezVousFuturs = rendezVousClient.filter(rendezVous => new Date(rendezVous.date) > dateActuelle && new Date(rendezVous.date) <= dateLimiteRappel);

        const rendezVousRappelMessages = rendezVousFuturs.map(rendezVous => {
            const differenceMs = new Date(rendezVous.date) - dateActuelle;
            const heuresRestantes = Math.floor(differenceMs / (1000 * 60 * 60)); // Heures entières restantes
            const minutesRestantes = Math.round((differenceMs % (1000 * 60 * 60)) / (1000 * 60)); // Minutes restantes arrondies

            if (heuresRestantes === 0 && minutesRestantes === 0) {
                return `Rendez-vous pour ${rendezVous.id_service.name} imminent`;
            } else if (heuresRestantes === 0) {
                return `Rendez-vous pour ${rendezVous.id_service.name} dans ${minutesRestantes} minutes`;
            } else {
                return `Rendez-vous pour ${rendezVous.id_service.name} dans ${heuresRestantes} heures et ${minutesRestantes} minutes`;
            }
        });

        return res.status(200).json(rendezVousRappelMessages);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};




