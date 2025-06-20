import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap"; // Make sure Button is imported if used
import { useNavigate } from 'react-router-dom';
import { FaBed, FaShower, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons

const FeaturedListing = () => {
  const navigate = useNavigate();

  const properties = [
    {
      id: 1,
      type: "FOR RENT",
      bedrooms: 3,
      bathrooms: 2,
      area: 1950,
      title: "Light And Modern House",
      address: "7409 Knollwood Cove, Austin, TX, 78731",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      type: "FOR RENT",
      bedrooms: 3,
      bathrooms: 2,
      area: 1950,
      title: "Light And Modern House",
      address: "7409 Knollwood Cove, Austin, TX, 78731",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      type: "FOR RENT",
      bedrooms: 3,
      bathrooms: 2,
      area: 1950,
      title: "Light And Modern House",
      address: "7409 Knollwood Cove, Austin, TX, 78731",
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 4,
      type: "FOR SALE",
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      title: "Spacious Family Home",
      address: "1234 Maple Street, Austin, TX, 78701",
      image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 5,
      type: "FOR RENT",
      bedrooms: 2,
      bathrooms: 1,
      area: 1200,
      title: "Cozy Downtown Apartment",
      address: "5678 Oak Avenue, Austin, TX, 78704",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 6,
      type: "FOR SALE",
      bedrooms: 5,
      bathrooms: 4,
      area: 3500,
      title: "Luxury Estate",
      address: "9101 Hillside Drive, Austin, TX, 78746",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const handleCardClick = (id) => {
    navigate(`/properties/${id}`); // Assuming you have a route set up for individual properties
  };

  const visibleProperties = properties.slice(
    activeIndex * itemsPerPage,
    (activeIndex + 1) * itemsPerPage
  );

  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h2 className="mb-3">Featured Listings</h2>
        <p className="lead">Browse our wide range of featured properties.</p>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {visibleProperties.map((property) => (
          <Col key={property.id}>
            <Card
              className="h-100 overflow-hidden"
              style={{ border: "none", boxShadow: "none", cursor: "pointer" }} // Added cursor pointer
              onClick={() => handleCardClick(property.id)}
            >
              <div className="position-relative" style={{ borderRadius: "10px", overflow: "hidden" }}>
                <Card.Img
                  variant="top"
                  src={property.image}
                  alt={property.title}
                  style={{
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "10px"
                  }}
                />
                <div className="position-absolute top-0 start-0 m-3">
                  {/* Badge with specified background color */}
                  <span className="badge text-white py-2 px-3" style={{ backgroundColor: '#429283' }}>
                    {property.type}
                  </span>
                </div>
                {/* 20px black transparent background at the bottom with icons */}
                <div
                  className="position-absolute bottom-0 start-0 w-100 px-3 py-2"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.2)", // 20% opacity black
                    height: "auto",
                    minHeight: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "0 0 10px 10px",
                    color: "white",
                    fontSize: "0.9em"
                  }}
                >
                  <span className="d-flex align-items-center">
                    <FaBed className="me-1" /> {property.bedrooms} &nbsp;
                    <FaShower className="me-1" /> {property.bathrooms} &nbsp;
                    <FaRulerCombined className="me-1" /> {property.area} m²
                  </span>
                </div>
              </div>
              <Card.Body>
                {/* Text aligned to the left */}
                <Card.Title className="h5 text-start">{property.title}</Card.Title>
                <Card.Text className="text-muted small text-start">
                  <FaMapMarkerAlt className="me-1" /> {/* Location icon */}
                  {property.address}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Navigation dots */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm mx-1 p-2 ${activeIndex === index ? 'bg-primary' : '#D9D9D9'}`}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                padding: 0,
                border: 'none',
                backgroundColor: activeIndex === index ? '#2495FD' : '#cccc' // Blue for active, grey for inactive
              }}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default FeaturedListing;