import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        contactInfo: '',
        username: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/users/${id}`)
            .then(response => {
                const user = response.data;
                setFormData({
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                    email: user.email || '',
                    phone: user.contactInfo || '', // Telefon numarası contactInfo alanında olabilir
                    address: user.address || '',
                    contactInfo: user.contactInfo || '',
                    username: user.username || ''
                });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        axios.put(`http://localhost:5000/api/users/${id}`, formData)
            .then(response => {
                alert('Profile updated successfully');
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
    };

    return (
        <div className="profile-page">
            <h1>Profil & Ayarlar</h1>
            <div className="profile-info">
                <h2>Hoşgeldiniz {formData.firstName} {formData.lastName}!</h2>
                <div className="profile-details">
                    <label htmlFor="firstName">İsim</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <label htmlFor="lastName">Soyisim</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">E-posta</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="phone">Telefon</label>
                    <input
                        type="tel"
                        id="phone"
                        name="contactInfo" // Adını contactInfo olarak değiştirdik
                        value={formData.contactInfo}
                        onChange={handleChange}
                    />
                    <label htmlFor="address">Adres</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <label htmlFor="contactInfo">İletişim Bilgisi</label>
                    <input
                        type="text"
                        id="contactInfo"
                        name="contactInfo"
                        value={formData.contactInfo}
                        onChange={handleChange}
                    />
                    <label htmlFor="username">Kullanıcı Adı</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled
                    />
                </div>
                <div className="profile-actions">
                    <button onClick={handleSave}>Kaydet</button>
                    <button>İptal</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
