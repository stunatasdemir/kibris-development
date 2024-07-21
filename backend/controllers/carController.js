const Car = require('../models/Car');
const User = require('../models/User');

exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id).populate('user', 'firstName lastName contactInfo memberSince');
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addCar = async (req, res) => {
    const {
        fullName, brand, model, year, price, mileage, engine, transmission,
        fuelType, drivetrain, images, carType, power, description
    } = req.body;

    console.log('Request Body:', req.body);

    if (
        !fullName || !brand || !model || !year || !price || !mileage || !engine ||
        !transmission || !fuelType || !drivetrain || !carType || !power
    ) {
        console.log('Missing required fields');
        return res.status(400).json({ message: 'All required fields must be provided' });
    }

    try {
        const user = await User.findById(req.user.id);
        const car = new Car({
            fullName, brand, model, year, price, mileage, engine, transmission,
            fuelType, drivetrain, images, carType, power, description,
            user: user._id
        });

        const newCar = await car.save();
        res.status(201).json(newCar);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(400).json({ message: err.message });
    }
};

exports.updateCar = async (req, res) => {
    try {
        console.log('Update request body:', req.body);
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        car.fullName = req.body.fullName || car.fullName;
        car.brand = req.body.brand || car.brand;
        car.model = req.body.model || car.model;
        car.year = req.body.year || car.year;
        car.price = req.body.price || car.price;
        car.description = req.body.description || car.description;
        car.mileage = req.body.mileage || car.mileage;
        car.engine = req.body.engine || car.engine;
        car.transmission = req.body.transmission || car.transmission;
        car.fuelType = req.body.fuelType || car.fuelType;
        car.drivetrain = req.body.drivetrain || car.drivetrain;
        car.carType = req.body.carType || car.carType;
        car.power = req.body.power || car.power;
        car.images = req.body.images || car.images;

        const updatedCar = await car.save();
        console.log('Updated car:', updatedCar);
        res.json(updatedCar);
    } catch (err) {
        console.log('Update error:', err.message);
        res.status(400).json({ message: err.message });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json({ message: 'Car deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Markaları büyük/küçük harf duyarsız olarak çekme
exports.getBrands = async (req, res) => {
    try {
        const brands = await Car.aggregate([
            { $group: { _id: { $toUpper: "$brand" } } },  // Büyük/küçük harf duyarsız grup
            { $sort: { _id: 1 } }  // Alfabetik sıralama
        ]);
        res.json(brands.map(brand => brand._id));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching brands' });
    }
};