// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister'; // Your Login/Register page



import './App.css';
import PropertyDetail from './pages/PropertyDetail';

function App() {
  return (
    <Router>
      <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* CORRECTED LINE: */}
          <Route path="/properties/:id" element={<PropertyDetail/>}/>
          <Route path="/login" element={<LoginRegister />} /> 
          {/* Change ` /properties/${property.id}` to ` /properties/:id` */}
        </Routes>
      
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;