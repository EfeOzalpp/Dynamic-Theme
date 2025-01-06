// Routing pages, if there was multiple pages they would be placed here
import './fonts/rubik.css';
import './fonts/orbitron.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage.jsx'; // Homepage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Route for the homepage */}
      </Routes>
    </Router>
  );
}

export default App;