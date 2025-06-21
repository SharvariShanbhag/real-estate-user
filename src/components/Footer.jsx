// src/components/Footer/Footer.js
import React from 'react';
import '../Css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo-section">
          {/* Replace with your actual logo component or image */}
          <div className="logo-icon">   </div>
          <div>
            {/* Replace with your actual brand name */}
            <h3>The Property Place</h3>
            <p>
              Your trusted partner in navigating the dynamic real estate landscape. We are dedicated to connecting you with your dream property, offering unparalleled service and expert guidance every step of the way.
            </p>
          </div>
        </div>

        <div className="footer-links-section">
          <div className="footer-column">
            <h4>Explore</h4>
            <ul>
              <li>Properties for Sale</li>
              <li>Properties for Rent</li>
              <li>New Developments</li>
              <li>Featured Listings</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li>Buy a Property</li>
              <li>Sell Your Home</li>
              <li>Rent a Home</li>
              <li>Property Valuation</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact</h4>
            <ul>
              <li>Contact Us</li>
              <li>Schedule a Viewing</li>
              <li>Get a Free Appraisal</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 The Property Place - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;