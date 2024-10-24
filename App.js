import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CommunitiesPage from './components/CommunitiesPage.js';
import ProfilePage from './components/ProfilePage.js';
import { FavoritesProvider } from './FavoritesContext';

const App = () => {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/communities" />} />
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
