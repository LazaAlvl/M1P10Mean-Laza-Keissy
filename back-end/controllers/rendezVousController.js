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
        return res.status(201).json('Rendez-vous registered successfully');
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
module.exports.Update_effectueRendezVous = async (req, res, next) => {
    try {
        const rendezVousId = req.params.id;
        const rendezVous = await RendezVous.findByIdAndUpdate(rendezVousId, { effectue: true }, { new: true });
        if (rendezVous) {
            return res.status(200).json({ message: 'Rendez-vous mis à jour avec succès' });
        } else {
            return res.status(404).json({ message: 'Rendez-vous non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du rendez-vous', error);
        return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

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

// Historique de rendez-vous d'un client
module.exports.GetRendezVousClient = async (req, res, next) => {
    try {
        const clientId = req.params.clientId;

        const rendezVousClient = await RendezVous.find({ id_client: clientId })
            .populate('id_employe', 'firstname lastname')
            .populate('id_service', 'name price')
            .exec();

        return res.status(200).json(rendezVousClient);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Rappels de rendez-vous dans les 24h pour les clients
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
                return `Appointment for ${rendezVous.id_service.name} imminent`;
            } else if (heuresRestantes === 0) {
                return `Appointment for ${rendezVous.id_service.name} in ${minutesRestantes} minutes`;
            } else {
                return `Appointment for ${rendezVous.id_service.name} in ${heuresRestantes} hours and ${minutesRestantes} minutes`;
            }
        });

        return res.status(200).json(rendezVousRappelMessages);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



// ---------- Partie Employé ----------

// Affichage des rendez-vous d'un employé >= today
module.exports.GetRendezVousEmploye = async (req, res, next) => {
    try {
        const employeId = req.params.employeId;
        
        // Obtenir la date actuelle
        const currentDate = new Date(); 
        currentDate.setHours(currentDate.getHours() + 3);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();

        const rendezVousEmploye = await RendezVous.find({
            id_employe: employeId,
            // Filtrer par année, mois et jour de la date actuelle
            "date": {
                $gte: new Date(year, month - 1, day), // Date de début de la journée actuelle
                $lt: new Date(year, month - 1, day + 1) // Date de fin de la journée actuelle
            },
            etat: true,
            effectue: false
        })
        .populate('id_client', 'firstname lastname')
        .populate('id_service', 'name price date')
        .exec();

        return res.status(200).json(rendezVousEmploye);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};




// Suivi des tâches effectuées et du montant de commission pour la journée
module.exports.SuiviTachesCommissionJourEmploye = async (req, res, next) => {
    try {
        const employeId = req.params.employeId;

        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 3);

        currentDate.setHours(0, 0, 0, 0);

        const debutJournee = currentDate;
        const finJournee = new Date(currentDate);
        finJournee.setDate(finJournee.getDate() + 1);

        const rendezVousJourEmploye = await RendezVous.find({
            id_employe: employeId,
            date: {
                $gte: debutJournee, // Date de début du jour
                $lt: finJournee      // Date de début du lendemain
            },
            effectue: true
        })
        .populate('id_service', 'price commission')
        .populate('id_client', 'firstname lastname')
        ;

        return res.status(200).json({ rendezVousJourEmploye });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// gestion horaire de travail
module.exports.GetHoraireTravail = async (req, res, next) => {
    try {
        const { employeId } = req.params; 

        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 3);
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const rendezVous = await RendezVous.find({
            id_employe: employeId,
            $expr: {
                $and: [
                    { $eq: [{ $year: "$date" }, currentYear] }, 
                    { $eq: [{ $month: "$date" }, currentMonth] }, 
                    { $eq: ["$etat", true] },
                    { $eq: ["$effectue", true] }
                ]
            }
        })
        .populate('id_employe', 'firstname lastname')
        .populate('id_client', 'firstname lastname')
        .populate('id_service', 'name price');

        return res.status(200).json(rendezVous);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

