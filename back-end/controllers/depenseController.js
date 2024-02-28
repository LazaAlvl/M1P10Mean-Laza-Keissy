const Depense = require('../models/depenseModel');


exports.createDepense = async (req, res) => {
  try {
    const { type, date, prix } = req.body;
    const newDepense = new Depense({ type, date, prix });
    await newDepense.save();
    res.status(201).json(newDepense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getAllDepenses = async (req, res) => {
  try {
    const depenses = await Depense.find();
    res.status(200).json(depenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updateDepense = async (req, res) => {
  try {
    const depense = await Depense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!depense) {
      return res.status(404).json({ error: 'Depense not found' });
    }
    res.status(200).json(depense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Fonction pour supprimer une dépense par son ID
exports.deleteDepense = async (req, res) => {
  try {
    const depense = await Depense.findByIdAndDelete(req.params.id);
    if (!depense) {
      return res.status(404).json({ error: 'Depense not found' });
    }
    res.status(200).json({ message: 'Depense deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
