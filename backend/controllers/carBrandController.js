const CarBrand = require('../models/carBrandModel');

exports.addCarBrand = async (req, res) => {
    try {
        const { brandName, models } = req.body;
        const newBrand = new CarBrand({ brand: brandName, models });
        await newBrand.save();
        res.status(201).json({ message: 'Araba markası ve modelleri başarıyla eklendi' });
    } catch (error) {
        res.status(500).json({ message: 'Araba markası ve modelleri eklenemedi', error });
    }
};

exports.getCarBrands = async (req, res) => {
    try {
        const carBrands = await CarBrand.find();
        res.status(200).json(carBrands);
    } catch (error) {
        res.status(500).json({ message: 'Araba markaları getirilemedi', error });
    }
};
