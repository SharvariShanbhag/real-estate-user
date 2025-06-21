import React from 'react';
import '../Css/PropertyGridSection.css';

// Import local images
import villa from '../assets/villa.jpg';
import home from '../assets/home.jpg';
import bath from '../assets/bath.jpg';

const PropertyGridSection = () => {
  return (
    <div className="property-grid-container">
      <div className="property-grid-section">
        {/* Villa - spans cols 1-2 and rows 1-3 */}
        <div className="property-card villa-card">
          <div className="property-image-container">
            <img src={villa} alt="Luxury Villa" className="property-image" />
            <div className="property-overlay">
               
            </div>
          </div>
        </div>

        {/* Home 1 - row 1, col 3 */}
        <div className="property-card home1-card">
          <div className="property-image-container">
            <img src={home} alt="Modern Apartment" className="property-image" />
            <div className="property-overlay">
               
            </div>
          </div>
        </div>

        {/* Section Header - row 1, cols 4-5 */}
        <div className="section-header">
          <h2>Wide Selection Of Properties</h2>
          <p>
            Delve into our distinguished portfolio, a collection where every residence is a testament to architectural artistry and opulent living. Your distinguished abode awaits its discovery.
          </p>
        </div>

        {/* Bath - spans cols 3-4 and rows 2-3 */}
        <div className="property-card bath-card">
          <div className="property-image-container">
            <img src={bath} alt="Luxury Bath" className="property-image" />
            <div className="property-overlay">
               
            </div>
          </div>
        </div>

        {/* Home 2 - row 2, col 5 */}
        <div className="property-card home2-card">
          <div className="property-image-container">
            <img src={home} alt="Country House" className="property-image" />
            <div className="property-overlay">
              
            </div>
          </div>
        </div>

        {/* Home 3 - row 3, col 5 */}
        <div className="property-card home3-card">
          <div className="property-image-container">
            <img src={home} alt="City Penthouse" className="property-image" />
            <div className="property-overlay">
               
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyGridSection;