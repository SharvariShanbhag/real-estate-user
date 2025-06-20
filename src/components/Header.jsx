import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; // Import FaMapMarkerAlt for location
import '../Css/Header.css';
import logoImage from '../assets/logo.jpg'; // Adjust the path to your actual logo image

const Header = () => {
  return (
    <header className="header" style={{ backgroundColor: 'white' }}>
      <div className="logo">
        <Link to="/">
          <img src={logoImage} alt="Company Logo" className="logo-image" />
        </Link>
      </div>
      <nav className="nav-menu">
        <ul>
          <li><Link to="/" style={{ color: 'black', fontWeight: 400 }}>Home</Link></li>
          <li>
            <Link to="/explore" style={{ color: 'black', fontWeight: 400 }}>
              <FaMapMarkerAlt style={{ marginRight: '5px', fontSize: '0.9em' }} /> {/* Smaller font size */}
              Explore
            </Link>
          </li>
          <li><Link to="/about" style={{ color: 'black', fontWeight: 400 }}>AboutUs</Link></li>
          <li><Link to="/contact" style={{ color: 'black', fontWeight: 400 }}>Contact Us</Link></li>
          <li className="request-call-item">
            <a href="tel:+1234567890" className="request-call-button" style={{ backgroundColor: '#2495FD', color: 'white' }}>
              <FaPhone className="call-icon" style={{ color: 'white' }} />
              <span style={{ color: 'white' }}>Request a Call</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;