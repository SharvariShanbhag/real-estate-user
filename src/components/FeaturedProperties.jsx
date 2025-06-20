import React from 'react';
import PropertyCard from './PropertyCard';
import '../Css/FeaturedProperties.css';

const FeaturedProperties = () => {
  const properties = [
    {
      id: 1,
      title: 'Modern Apartment in Downtown',
      address: '123 Main St, New York, NY',
      price: 350000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: 'Apartment',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      title: 'Luxury Villa with Pool',
      address: '456 Ocean Ave, Miami, FL',
      price: 1200000,
      bedrooms: 4,
      bathrooms: 3.5,
      area: 3200,
      type: 'Villa',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 3,
      title: 'Cozy Family House',
      address: '789 Park Lane, Chicago, IL',
      price: 450000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      type: 'House',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 4,
      title: 'Stylish Loft Apartment',
      address: '321 Arts District, Los Angeles, CA',
      price: 650000,
      bedrooms: 1,
      bathrooms: 1,
      area: 950,
      type: 'Loft',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];

  return (
    <section className="featured-properties">
      <div className="container">
        <div className="section-header">
          <h2>Featured Properties</h2>
          <p>Discover our handpicked selection of premium properties</p>
        </div>
        <div className="properties-grid">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <button className="view-all-btn">View All Properties</button>
      </div>
    </section>
  );
};

export default FeaturedProperties;