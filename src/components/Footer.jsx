// src/components/Footer/Footer.js
import React from 'react';
import '../Css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo-section">
          <div className="logo-icon">🔵</div>
          <div>
            <h3>Logo</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.
            </p>
          </div>
        </div>

        <div className="footer-links-section">
          <div className="footer-column">
            <h4>Explore</h4>
            <ul>
              <li>Lorem Ipsum</li>
              <li>Lorem Ipsum</li>
              <li>Lorem Ipsum</li>
              <li>Lorem Ipsum</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li>Lorem Ipsum</li>
              <li>Lorem Ipsum</li>
              <li>Lorem Ipsum</li>
              <li>Lorem Ipsum</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact</h4>
            <ul>
              <li>Lorem Ipsum</li>
              <li>Lorem Ipsum</li>
              <li>Lorem Ipsum</li>
              <li>Lorem Ipsum</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Lorem Ipsum - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
