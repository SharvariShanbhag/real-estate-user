// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';


import './App.css';
import PropertyDetail from './pages/PropertyDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* CORRECTED LINE: */}
          <Route path="/properties/:id" element={<PropertyDetail/>}/>
          {/* Change ` /properties/${property.id}` to ` /properties/:id` */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;