import React from 'react';
import Navbar from '../pages/components/Navbar';
import Footer from '../pages/components/Footer';
import { ReactComponent as KibrisarabamLogo } from '../assets/kibrislogo.svg';
import './TrinkSatPage.css';

function TrinkSatPage() {
    return (
        <div>
            <Navbar />
            <div className="coming-soon-container">
                <KibrisarabamLogo className="logo" />
                <h1>Çok Yakında Hizmetinizde!</h1>
            </div>
            <Footer />
        </div>
    );
}

export default TrinkSatPage;
