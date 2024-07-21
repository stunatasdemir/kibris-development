import { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as KibrisarabamLogo } from '../../assets/kibrislogo.svg';
import { ReactComponent as PhoneLogo } from '../../assets/phone.svg';
import { ReactComponent as WhatsappLogo } from '../../assets/whatsapp.svg';
import "../homePage.css";
import "./Navbar.css";  // Yeni CSS dosyası
import { Link as ScrollLink } from 'react-scroll';

function Navbar() {
    const navRef = useRef();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const firstName = localStorage.getItem('firstName');
        const id = localStorage.getItem('userId');

        if (token && firstName && id) {
            setIsAuthenticated(true);
            setUserName(firstName);
            setUserId(id);
        }
    }, []);

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    const handleAdminClick = () => {
        if (isAuthenticated) {
            navigate('/admin');
        } else {
            navigate('/admin/login');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        localStorage.removeItem('userId');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <header className="header">
            <div className='header_logo'>
                <Link to='/'><KibrisarabamLogo /></Link>
            </div>
            <nav className='header_menu' ref={navRef}>
                <Link to='/'><ul className='header_menu-item'>Anasayfa</ul></Link>
                <ScrollLink to="tum-araclar" smooth={true}><ul className='header_menu-item'>Araçlarımız</ul></ScrollLink>
                <Link to='/kıbrısautokonum'><ul className='header_menu-item'>İletişim</ul></Link>
                {isAuthenticated && <Link to='/add-car'><ul className='header_menu-item'>Araba Ekle</ul></Link>}
                <ul className='header_menu-item' onClick={handleAdminClick}>Admin</ul>
                {isAuthenticated ? (
                    <div className='header_user-menu'>
                        <span className='header_user-name'>Hoşgeldiniz {userName} Bey!</span>
                        <div className='header_user-dropdown'>
                            <Link to={`/profile/${userId}`}><div className='header_user-dropdown-item'>Profil & Ayarlar</div></Link>
                            <Link to='/my-cars'><div className='header_user-dropdown-item'>İlanlarım</div></Link>
                            <Link to='/dashboard'><div className='header_user-dropdown-item'>Kokpit</div></Link>
                            <Link to='/messages'><div className='header_user-dropdown-item'>Mesajlar</div></Link>
                            <Link to='/turbolar'><div className='header_user-dropdown-item'>Turbolar</div></Link>
                            <Link to='/favorite-ads'><div className='header_user-dropdown-item'>Favori İlanlar</div></Link>
                            <Link to='/favorite-searches'><div className='header_user-dropdown-item'>Favori Aramalar</div></Link>
                            <Link to='/damage-query'><div className='header_user-dropdown-item'>Hasar Sorgulama</div></Link>
                            <Link to='/expertise'><div className='header_user-dropdown-item'>Ekspertiz</div></Link>
                            <Link to='/trink-al'><div className='header_user-dropdown-item'>Trink Al</div></Link>
                            <Link to='/trink-sat'><div className='header_user-dropdown-item'>Trink Sat</div></Link>
                            <Link to='/add-car-brand'><div className='header_user-dropdown-item'>Marka & Model Ekle</div></Link>
                            <div className='header_user-dropdown-item' onClick={handleLogout}>Çıkış Yap</div>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link to='/login'><ul className='header_menu-item'>Giriş Yap</ul></Link>
                        <Link to='/register'><ul className='header_menu-item'>Kayıt Ol</ul></Link>
                    </>
                )}
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>X</button>
            </nav>
            <div className='header_buttons'>
                <div className='header_menu-button-phone'>
                    <a href='tel:+901234567890'><PhoneLogo /></a> 
                </div>
                <div className='header_menu-button-whatsapp'>
                    <a href='https://wa.me/+901234567890'><WhatsappLogo /></a>
                </div>
            </div>
            <button className="nav-btn" onClick={showNavbar}>☰</button>
        </header>
    );
}

export default Navbar;
