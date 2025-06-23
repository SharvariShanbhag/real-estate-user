// src/components/Header/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import {  FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdCall } from "react-icons/io";

import '../Css/Header.css';
import logoImage from '../assets/logo.jpg'; // Adjust this path to your actual logo image

const Header = () => {
  return (
    <header className="header" style={{ backgroundColor: 'white' }}>
      <div className="logo">
        <Link to="/">
          {/* Ensure the 'logo-image' class is here */}
          <img src={logoImage} alt="Company Logo" className="logo-image" />
        </Link>
      </div>
      <nav className="nav-menu">
        <ul>
          <li><Link to="/" style={{ color: 'black', fontWeight: 400 }}>Home</Link></li>
          <li>
            <Link to="/explore" style={{ color: 'black', fontWeight: 400 }}>
              <FaMapMarkerAlt style={{ marginRight: '5px', fontSize: '0.9em' }} />
              Explore
            </Link>
          </li>
          <li><Link to="/about" style={{ color: 'black', fontWeight: 400 }}>About Us</Link></li>
          <li><Link to="/contact" style={{ color: 'black', fontWeight: 400 }}>Contact Us</Link></li>
          <li className="request-call-item">
            <a href="tel:+1234567890" className="request-call-button" style={{ backgroundColor: '#2495FD', color: 'white' }}>
              <IoMdCall className="call-icon" style={{ color: 'white',}} />
              <span style={{ color: 'white' }}>Request a Call</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;