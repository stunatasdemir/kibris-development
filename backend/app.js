const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const carBrandRoutes = require('./routes/carBrandRoutes'); // Yeni eklenen route

const app = express();
app.use(cors());  // CORS middleware'ini ekleyin

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Veritabanı bağlantısı
mongoose.connect('mongodb+srv://stunatasdemir:23417202001Salih@kibrisarabam.gzblbbu.mongodb.net/?retryWrites=true&w=majority&appName=kibrisarabam', {})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Rotalar
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes); // Araba rotalarını kullan
app.use('/api/users', userRoutes); // Kullanıcı rotalarını kullan
app.use('/api/car-brands', carBrandRoutes); // Yeni eklenen araba markaları rotasını kullan

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
