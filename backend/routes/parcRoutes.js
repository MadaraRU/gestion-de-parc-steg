const express = require('express');
const {
  getAllParcs,
  addParc,
  updateParc,
  deleteParc,
  getParc,
} = require('../controllers/parcControllers');
const {
  getAllVoitures,
  addVoiture,
  deleteVoiture,
  updateVoiture,
} = require('../controllers/voitureControllers');
const { verifyToken } = require('../middlewares/authJwt');
const router = express.Router();

router.route('/').get(verifyToken, getAllParcs).post(verifyToken, addParc);

router
  .route('/:id')
  .get(verifyToken, getParc)
  .put(verifyToken, updateParc)
  .delete(verifyToken, deleteParc);

router
  .route('/:id/voiture')
  .get(verifyToken, getAllVoitures)
  .post(verifyToken, addVoiture);

router
  .route('/:id/voiture/:voitureId')
  .put(verifyToken, updateVoiture)
  .delete(verifyToken, deleteVoiture);

module.exports = router;
