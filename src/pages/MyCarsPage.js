import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MyCarsPage.css';

function MyCarsPage() {
    const [cars, setCars] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/cars/my-cars', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            setCars(response.data);
        })
        .catch(error => {
            setError('İlanlar alınamadı.');
        });
    }, []);

    return (
        <div className="my-cars-page">
            <h1>İlanlarım</h1>
            {error && <p>{error}</p>}
            <div className="car-list">
                {cars.map(car => (
                    <div key={car._id} className="car-item">
                        <img src={car.images[0]} alt={`${car.brand} ${car.model}`} />
                        <div className="car-info">
                            <p>{car.brand} {car.model}</p>
                            <p>{car.price} TL</p>
                            <Link to={`/details/${car._id}`}><button className="btn">Detaylar</button></Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyCarsPage;
