const asyncHandler = require('express-async-handler');
const db = require('../models');

const Parc = db.parc;

const getAllParcs = asyncHandler(async (req, res) => {
  const parcs = await Parc.findAll();
  res.json(parcs);
});

const addParc = asyncHandler(async (req, res) => {
  const { reference, departement, nombre_de_place } = req.body;

  const parc = await Parc.create({
    reference,
    departement,
    nombre_de_place,
  });

  res.json(parc);
});

const getParc = asyncHandler(async (req, res) => {
  const parc = await Parc.findByPk(req.params.id);
  if (!parc) {
    return res.status(404).send('Parc not found');
  }
  res.json(parc);
});

const updateParc = asyncHandler(async (req, res) => {
  const { reference, departement, nombre_de_place } = req.body;
  const parc = await Parc.findByPk(req.params.id);
  if (!parc) {
    return res.status(404).send('Parc not found');
  }
  await parc.update({
    reference,
    departement,
    nombre_de_place,
  });

  res.json(parc);
});

const deleteParc = asyncHandler(async (req, res) => {
  const parc = await Parc.findByPk(req.params.id);
  if (!parc) {
    return res.status(404).send('Parc not found');
  }
  await parc.destroy();
  res.send('Parc deleted');
});

module.exports = {
  getAllParcs,
  getParc,
  addParc,
  updateParc,
  deleteParc,
};
