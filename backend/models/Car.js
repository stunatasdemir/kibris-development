const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    fullName: String,
    brand: String,
    model: String,
    year: Number,
    price: Number,
    description: String,
    mileage: Number,
    engine: String,
    transmission: String,
    fuelType: String,
    drivetrain: String,
    carType: String,
    power: Number,
    images: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Car', CarSchema);
