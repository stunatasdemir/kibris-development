const mongoose = require('mongoose');

const carBrandSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        unique: true
    },
    models: [
        {
            modelName: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('CarBrand', carBrandSchema);
