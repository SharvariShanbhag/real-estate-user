import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { FaBed, FaShower, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';

const FeaturedListing = () => {
  const navigate = useNavigate();

  // This 'properties' array contains all your static data
 const properties = [
  {
    id: 1,
    type: "FOR RENT",
    bedrooms: 4, // Increased for luxury
    bathrooms: 3, // Increased for luxury
    area: 2800, // Larger area for luxury
    title: "The Beaumont Residence: A Modern Sanctuary", // More luxurious title
    address: "7409 Knollwood Cove, Austin, TX, 78731", // Kept as is
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    type: "FOR SALE", // Changed to FOR SALE for variety
    bedrooms: 5,
    bathrooms: 4,
    area: 4500, // Significantly larger for luxury estate
    title: "Grandview Manor: An Opulent Urban Retreat", // More luxurious title
    address: "2100 Skyline Heights, Austin, TX, 78703", // New, more luxurious address
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=80"
  },
  {
    id: 3,
    type: "FOR RENT",
    bedrooms: 3,
    bathrooms: 2,
    area: 2100, // Slightly larger
    title: "The Crestwood Loft: Contemporary Elegance", // More luxurious title
    address: "7409 Knollwood Cove, Austin, TX, 78731", // Kept as is
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 4,
    type: "FOR SALE",
    bedrooms: 6, // Even more for a grand estate
    bathrooms: 5,
    area: 6200, // Very large for a luxury estate
    title: "Emerald Ridge Estate: A Masterpiece of Design", // Highly luxurious title
    address: "1234 Monarch Way, Austin, TX, 78746", // Luxurious address
    image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 5,
    type: "FOR RENT",
    bedrooms: 2,
    bathrooms: 2, // Increased bathrooms for luxury apartment
    area: 1800, // Larger for a luxury apartment
    title: "The Pinnacle Suites: Exclusive City Living", // Luxurious apartment title
    address: "5678 Artisan Boulevard, Austin, TX, 78704", // More luxurious address
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 6,
    type: "FOR SALE",
    bedrooms: 5,
    bathrooms: 5,
    area: 5500,
    title: "The Royal Oak Residence: A Statement of Elegance", // Very luxurious title
    address: "9101 Belvedere Court, Austin, TX, 78730", // More luxurious address
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
    // This just navigates to a URL; no data fetching happens here.
    navigate(`/properties/${id}`);
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
              style={{ border: "none", boxShadow: "none", cursor: "pointer" }}
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
                  <span className="badge text-white py-2 px-3" style={{ backgroundColor: '#429283' }}>
                    {property.type}
                  </span>
                </div>
                <div
                  className="position-absolute bottom-0 start-0 w-100 px-3 py-2"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
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
                <Card.Title className="h5 text-start">{property.title}</Card.Title>
                <Card.Text className="text-muted small text-start">
                  <FaMapMarkerAlt className="me-1" />
                  {property.address}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

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
                backgroundColor: activeIndex === index ? '#2495FD' : '#cccc'
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