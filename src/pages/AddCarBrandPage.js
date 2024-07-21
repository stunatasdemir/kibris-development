import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './AddCarBrandPage.css';

function AddCarBrandPage() {
    const [brandName, setBrandName] = useState('');
    const [models, setModels] = useState(['']);
    
    const handleModelChange = (index, value) => {
        const newModels = [...models];
        newModels[index] = value;
        setModels(newModels);
    };

    const handleAddModel = () => {
        setModels([...models, '']);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/car-brands/add', {
                brandName,
                models: models.map(model => ({ modelName: model }))
            });
            alert('Araba markası ve modelleri başarıyla eklendi.');
            setBrandName('');
            setModels(['']);
        } catch (error) {
            console.error('Araba markası ve modelleri eklenirken hata oluştu:', error);
            alert('Hata: Araba markası ve modelleri eklenemedi.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="add-car-brand-container">
                <h1>Araba Markası ve Modelleri Ekle</h1>
                <form onSubmit={handleSubmit} className="add-car-brand-form">
                    <div className="form-group">
                        <label htmlFor="brandName">Marka Adı</label>
                        <input
                            type="text"
                            id="brandName"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Modeller</label>
                        {models.map((model, index) => (
                            <input
                                key={index}
                                type="text"
                                value={model}
                                onChange={(e) => handleModelChange(index, e.target.value)}
                                required
                            />
                        ))}
                        <button type="button" onClick={handleAddModel}>Model Ekle</button>
                    </div>
                    <button type="submit" className="submit-button">Ekle</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default AddCarBrandPage;
