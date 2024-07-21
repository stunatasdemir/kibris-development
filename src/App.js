import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../src/pages/homePage';
import OtoDetails from '../src/pages/OtoDetails';
import AdminLogin from '../src/pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import PrivateRoute from '../src/pages/components/PrivateRoute';
import KıbrısAutoKonum from './pages/kıbrısautokonum';
import SplashScreen from '../src/pages/components/SplashScreen';
import RegisterPage from '../src/pages/RegisterPage';
import LoginPage from '../src/pages/LoginPage';
import ProfilePage from '../src/pages/ProfilePage';
import AddCarPage from '../src/pages/AddCarPage';
import MyCarsPage from '../src/pages/MyCarsPage';
import DashboardPage from '../src/pages/DashboardPage';
import MessagesPage from '../src/pages/MessagesPage';
import TurbolarPage from '../src/pages/TurbolarPage';
import FavoriteAdsPage from '../src/pages/FavoriteAdsPage';
import FavoriteSearchesPage from '../src/pages/FavoriteSearchesPage';
import DamageQueryPage from '../src/pages/DamageQueryPage';
import ExpertisePage from '../src/pages/ExpertisePage';
import TrinkAlPage from '../src/pages/TrinkAlPage';
import TrinkSatPage from '../src/pages/TrinkSatPage';
import AddCarBrandPage from '../src/pages/AddCarBrandPage'; // Yeni sayfa import edildi

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading ? (
        <SplashScreen setLoading={setLoading} />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kıbrısautokonum" element={<KıbrısAutoKonum />} />
          <Route path="/details/:id" element={<OtoDetails />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <PrivateRoute isAdmin={true}>
              <AdminPanel />
            </PrivateRoute>
          } />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:id" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/add-car" element={<PrivateRoute><AddCarPage /></PrivateRoute>} />
          <Route path="/my-cars" element={<PrivateRoute><MyCarsPage /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/messages" element={<PrivateRoute><MessagesPage /></PrivateRoute>} />
          <Route path="/turbolar" element={<PrivateRoute><TurbolarPage /></PrivateRoute>} />
          <Route path="/favorite-ads" element={<PrivateRoute><FavoriteAdsPage /></PrivateRoute>} />
          <Route path="/favorite-searches" element={<PrivateRoute><FavoriteSearchesPage /></PrivateRoute>} />
          <Route path="/damage-query" element={<PrivateRoute><DamageQueryPage /></PrivateRoute>} />
          <Route path="/expertise" element={<PrivateRoute><ExpertisePage /></PrivateRoute>} />
          <Route path="/trink-al" element={<PrivateRoute><TrinkAlPage /></PrivateRoute>} />
          <Route path="/trink-sat" element={<PrivateRoute><TrinkSatPage /></PrivateRoute>} />
          <Route path="/add-car-brand" element={<PrivateRoute><AddCarBrandPage /></PrivateRoute>} /> {/* Yeni rota eklendi */}
        </Routes>
      )}
    </div>
  );
}

export default App;
