const express = require('express');
const { getVoiture } = require('../controllers/voitureControllers');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJwt');

router.route('/:id').get(verifyToken, getVoiture);

module.exports = router;
