// src/components/Newsletter/Newsletter.js
import React from 'react';
import '../Css/Newsletter.css';

const Newsletter = () => {
  return (
    <section className="newsletter">
      <div className="newsletter-row">
        <h2 className="newsletter-title">Newsletter Signup</h2>
        <input
          type="email"
          className="newsletter-input"
          placeholder="Enter your email"
        />
      </div>
    </section>
  );
};

export default Newsletter;
