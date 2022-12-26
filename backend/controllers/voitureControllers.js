const asyncHandler = require('express-async-handler');
const db = require('../models');
const Parc = db.parc;
const Voiture = db.voiture;

const getAllVoitures = asyncHandler(async (req, res) => {
  const parc = await Parc.findByPk(req.params.id, {
    include: ['voitures'],
  });

  if (!parc) {
    return res.status(404).send('Parc not found');
  }

  const voiture = parc.voitures;

  res.json(voiture);
});

const addVoiture = asyncHandler(async (req, res) => {
  const { marque, model, plaque } = req.body;
  const parc = await Parc.findByPk(req.params.id, {
    include: ['voitures'],
  });

  if (!parc) {
    return res.status(404).send('Parc not found');
  }

  const voiture = await Voiture.create({
    marque,
    model,
    plaque,
  });

  await parc.addVoiture(voiture);

  res.json(voiture);
});

const updateVoiture = asyncHandler(async (req, res) => {
  const { marque, model, plaque } = req.body;
  const parc = await Parc.findByPk(req.params.id, {
    include: ['voitures'],
  });

  const voiture = await Voiture.findByPk(req.params.voitureId);

  if (!parc) {
    return res.status(404).send('Parc not found');
  }

  if (!voiture) {
    return res.status(404).send('Voiture not found');
  }

  await Voiture.update(
    {
      marque,
      model,
      plaque,
    },
    {
      where: { id: req.params.voitureId },
    }
  );

  res.send('voiture updated');
});

const deleteVoiture = asyncHandler(async (req, res) => {
  const parc = await Parc.findByPk(req.params.id, {
    include: ['voitures'],
  });

  const voiture = await Voiture.findByPk(req.params.voitureId);

  if (!parc) {
    return res.status(404).send('Parc not found');
  }

  if (!voiture) {
    return res.status(404).send('Voiture not found');
  }

  await Voiture.destroy({
    where: { id: req.params.voitureId },
  });

  res.send('voiture deleted');
});

module.exports = {
  getAllVoitures,
  addVoiture,
  deleteVoiture,
  updateVoiture,
};
