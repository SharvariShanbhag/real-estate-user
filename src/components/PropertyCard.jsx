import React from 'react';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import '../Css/PropertyCard.css';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <div className="property-image">
        <img src={property.image} alt={property.title} />
        <div className="property-tags">
          <span className="property-price">${property.price.toLocaleString()}</span>
          <span className="property-type">{property.type}</span>
        </div>
      </div>
      <div className="property-details">
        <h3>{property.title}</h3>
        <p className="property-address">{property.address}</p>
        <div className="property-features">
          <span><FaBed /> {property.bedrooms}</span>
          <span><FaBath /> {property.bathrooms}</span>
          <span><FaRulerCombined /> {property.area} sqft</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;