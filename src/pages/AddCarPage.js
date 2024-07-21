import React, { useState } from 'react';
import axios from 'axios';
import './AddCarPage.css';

function AddCarPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        brand: '',
        model: '',
        year: '',
        price: '',
        description: '',
        mileage: '',
        engine: '',
        transmission: '',
        fuelType: '',
        drivetrain: '',
        carType: '',
        power: '',
        images: []
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            images: e.target.files
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            if (key === 'images') {
                for (let i = 0; i < formData.images.length; i++) {
                    data.append('images', formData.images[i]);
                }
            } else {
                data.append(key, formData[key]);
            }
        }
        try {
            await axios.post('http://localhost:5000/api/cars', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage('Araba başarıyla eklendi.');
        } catch (error) {
            setMessage('Araba eklenirken hata oluştu.');
        }
    };

    return (
        <div className="add-car-page">
            <h1>Araba Ekle</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="fullName" placeholder="Ad Soyad" value={formData.fullName} onChange={handleChange} required />
                <input type="text" name="brand" placeholder="Marka" value={formData.brand} onChange={handleChange} required />
                <input type="text" name="model" placeholder="Model" value={formData.model} onChange={handleChange} required />
                <input type="number" name="year" placeholder="Yıl" value={formData.year} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Fiyat" value={formData.price} onChange={handleChange} required />
                <textarea name="description" placeholder="Açıklama" value={formData.description} onChange={handleChange} required></textarea>
                <input type="number" name="mileage" placeholder="Kilometre" value={formData.mileage} onChange={handleChange} required />
                <input type="text" name="engine" placeholder="Motor Hacmi" value={formData.engine} onChange={handleChange} required />
                <input type="text" name="transmission" placeholder="Vites" value={formData.transmission} onChange={handleChange} required />
                <input type="text" name="fuelType" placeholder="Yakıt Türü" value={formData.fuelType} onChange={handleChange} required />
                <input type="text" name="drivetrain" placeholder="Çekiş" value={formData.drivetrain} onChange={handleChange} required />
                <input type="text" name="carType" placeholder="Kasa Tipi" value={formData.carType} onChange={handleChange} required />
                <input type="number" name="power" placeholder="Motor Gücü" value={formData.power} onChange={handleChange} required />
                <input type="file" name="images" multiple onChange={handleImageChange} required />
                <button type="submit" className="btn">Ekle</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddCarPage;
