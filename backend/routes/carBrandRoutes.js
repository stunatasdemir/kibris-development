const express = require('express');
const router = express.Router();
const carBrandController = require('../controllers/carBrandController');

router.post('/add', carBrandController.addCarBrand);
router.get('/', carBrandController.getCarBrands);

module.exports = router;
